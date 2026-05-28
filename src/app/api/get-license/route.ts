import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Missing email parameter" }, { status: 400 });
    }

    const sanitizedEmail = email.trim().toLowerCase();

    if (process.env.DATABASE_URL) {
      // Lookup license by customer email securely
      const result = await sql`
        SELECT passcode FROM licenses WHERE LOWER(email) = ${sanitizedEmail} LIMIT 1
      `;

      if (result && result.length > 0) {
        return NextResponse.json({ success: true, passcode: result[0].passcode });
      }

      return NextResponse.json(
        { success: false, error: "License not found yet. Webhook processing..." },
        { status: 404 }
      );
    } else {
      // Development mock mode to allow quick, smooth testing of checkout success layouts
      console.warn("DATABASE_URL is not set. Simulating fallback license key for testing.");
      return NextResponse.json({ 
        success: true, 
        passcode: "HYPER8", 
        mock: true 
      });
    }
  } catch (err) {
    console.error("Failed to query database licenses:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
