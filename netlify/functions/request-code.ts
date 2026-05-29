import { neon } from '@neondatabase/serverless';
import crypto from 'crypto';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
    }

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      return new Response(JSON.stringify({ error: 'Database configuration missing' }), { status: 500 });
    }

    const sql = neon(databaseUrl);

    // Check if email exists
    const licenses = await sql`
      SELECT id FROM licenses WHERE email = ${email}
    `;

    if (licenses.length === 0) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'No active license found for this email. Please purchase a license first.' 
      }), { status: 404 });
    }

    // Generate new cryptographically secure 6-digit passcode
    const randomBuffer = crypto.randomBytes(4);
    const randomNumber = randomBuffer.readUInt32BE(0);
    const passcode = (randomNumber % 900000 + 100000).toString(); // 100000 to 999999

    // Rewrite license with new passcode and reset activation status
    await sql`
      UPDATE licenses 
      SET passcode = ${passcode}, activated = false, activated_at = NULL 
      WHERE email = ${email}
    `;

    return new Response(JSON.stringify({ 
      success: true, 
      passcode: passcode,
      message: 'New passcode generated successfully!' 
    }), { status: 200 });

  } catch (error) {
    console.error('Request code error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
