import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sql, initDatabase } from "@/lib/db";

// Generate a cryptographically secure, highly readable 6-character passcode
function generateSecurePasscode(): string {
  // Use a 32-character set of clear uppercase alphanumeric digits (excluding confusing 0, O, 1, I)
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  const randomBytes = crypto.randomBytes(6);
  for (let i = 0; i < 6; i++) {
    code += chars[randomBytes[i] % chars.length];
  }
  return code;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Automatically ensure database tables exist dynamically
    await initDatabase();

    const rawBody = await req.text();
    const signatureHeader = req.headers.get("paddle-signature") || "";
    const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET;

    // 2. Validate Paddle Webhook Signature securely
    if (webhookSecret && signatureHeader) {
      try {
        const parts = signatureHeader.split(";");
        let ts = "";
        let h1 = "";
        for (const part of parts) {
          const [key, value] = part.split("=");
          if (key === "ts") ts = value;
          if (key === "h1") h1 = value;
        }

        if (!ts || !h1) {
          return NextResponse.json({ error: "Invalid signature format" }, { status: 400 });
        }

        const hmac = crypto.createHmac("sha256", webhookSecret);
        hmac.update(`${ts}:${rawBody}`);
        const computedHash = hmac.digest("hex");

        const isMatch = crypto.timingSafeEqual(
          Buffer.from(computedHash, "hex"),
          Buffer.from(h1, "hex")
        );

        if (!isMatch) {
          console.warn("Paddle signature verification failed: mismatch");
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
      } catch (err) {
        console.error("Signature processing error:", err);
        return NextResponse.json({ error: "Invalid signature verification" }, { status: 401 });
      }
    } else {
      console.warn("PADDLE_WEBHOOK_SECRET is missing or signature header not sent. Bypassing verification in dev.");
    }

    // 3. Parse and process incoming checkout payload
    let payload: any;
    try {
      payload = JSON.parse(rawBody);
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    // Check if the event is a completed checkout
    const eventType = payload.event_type || "";
    if (eventType === "checkout.completed" || eventType === "transaction.completed") {
      const email = payload.data?.customer?.email || payload.data?.customer_details?.email;
      
      if (!email) {
        console.error("Customer email is missing in Paddle payload");
        return NextResponse.json({ error: "Email missing" }, { status: 400 });
      }

      // Generate a secure passcode
      const passcode = generateSecurePasscode();
      console.log(`Generating license key for customer email: ${email} -> ${passcode}`);

      // Insert license dynamically, preventing duplicate conflicts on unique email checks
      if (process.env.DATABASE_URL) {
        try {
          // Check if license already exists to avoid throwing duplicate constraint errors
          const existing = await sql`
            SELECT passcode FROM licenses WHERE email = ${email} LIMIT 1
          `;

          if (existing && existing.length > 0) {
            console.log(`License already active for ${email}: ${existing[0].passcode}`);
            return NextResponse.json({ success: true, passcode: existing[0].passcode });
          }

          // Insert new secure license key
          await sql`
            INSERT INTO licenses (email, passcode, activated)
            VALUES (${email}, ${passcode}, false)
            ON CONFLICT (email) DO NOTHING
          `;
          console.log(`Successfully persisted license key in Neon for ${email}`);
        } catch (dbErr) {
          console.error("Failed to write to Neon database:", dbErr);
          return NextResponse.json({ error: "Database transaction failed" }, { status: 500 });
        }
      } else {
        // Fallback for simulation/testing logs in local dev without active DB url
        console.log(`[SIMULATION MODE] Written license record: ${email} -> ${passcode}`);
      }

      return NextResponse.json({ success: true, passcode });
    }

    // Return standard response for other events
    return NextResponse.json({ success: true, received: true });
  } catch (globalErr) {
    console.error("Paddle webhook global handler failure:", globalErr);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
