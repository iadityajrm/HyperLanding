import { neon } from '@neondatabase/serverless';
import crypto from 'crypto';

function verifyPaddleWebhook(req: Request, rawBody: string): boolean {
  const signature = req.headers.get('paddle-signature');
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  
  if (!signature || !secret) {
    return false;
  }
  
  // Paddle signature format: ts=12345;h1=hash
  const parts = signature.split(';');
  const tsPart = parts.find(p => p.startsWith('ts='));
  const h1Part = parts.find(p => p.startsWith('h1='));
  
  if (!tsPart || !h1Part) return false;
  
  const ts = tsPart.substring(3);
  const h1 = h1Part.substring(3);
  
  const signedPayload = `${ts}:${rawBody}`;
  const computedHash = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');
    
  return computedHash === h1;
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);
    const isSimulation = body.is_simulation === true;
    
    // Verify Webhook Signature (optional, can be bypassed in dev if secret not set, or during simulation testing)
    if (process.env.PADDLE_WEBHOOK_SECRET && !isSimulation && !verifyPaddleWebhook(req, rawBody)) {
      return new Response(JSON.stringify({ error: 'Invalid webhook signature' }), { status: 401 });
    }
    
    // We only care about checkout completed
    if (body.event_type !== 'transaction.completed') {
      return new Response(JSON.stringify({ received: true }), { status: 200 });
    }

    // Extract email from Paddle's transaction completed event
    // Format varies by Paddle Billing API, usually data.customer.email or we can fetch customer
    let email = '';
    if (body.data?.customer?.email) {
      email = body.data.customer.email;
    } else if (body.data?.customer_id) {
      // If only customer_id is provided, in a real app we might need to fetch the customer via API
      // For now, try to find an email field anywhere
      email = body.data.customer_email || body.data.receipt_data?.email;
    }
    
    // Fallback if missing
    if (!email) {
      console.warn("Could not extract email from webhook payload", body);
      return new Response(JSON.stringify({ error: 'Email not found in payload' }), { status: 400 });
    }

    // Generate cryptographically secure 6-digit numeric passcode
    const randomBuffer = crypto.randomBytes(4);
    const randomNumber = randomBuffer.readUInt32BE(0);
    const passcode = (randomNumber % 900000 + 100000).toString(); // 100000 to 999999

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      return new Response(JSON.stringify({ error: 'Database configuration missing' }), { status: 500 });
    }

    const sql = neon(databaseUrl);

    // Insert into Neon (handle duplicates gracefully)
    try {
      await sql`
        INSERT INTO licenses (email, passcode, activated)
        VALUES (${email}, ${passcode}, false)
        ON CONFLICT (email) DO NOTHING
      `;
    } catch (dbError) {
      console.error('Database insert error:', dbError);
      return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
