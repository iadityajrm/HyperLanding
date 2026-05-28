import { neon } from '@neondatabase/serverless';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { email, passcode } = await req.json();

    if (!email || !passcode) {
      return new Response(JSON.stringify({ error: 'Email and passcode required' }), { status: 400 });
    }

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      return new Response(JSON.stringify({ error: 'Database configuration missing' }), { status: 500 });
    }

    const sql = neon(databaseUrl);

    // Verify passcode
    const licenses = await sql`
      SELECT id, activated FROM licenses 
      WHERE email = ${email} AND passcode = ${passcode}
    `;

    if (licenses.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid email or passcode' }), { status: 401 });
    }

    if (licenses[0].activated) {
      return new Response(JSON.stringify({ error: 'License is already activated' }), { status: 409 });
    }

    // Activate
    await sql`
      UPDATE licenses 
      SET activated = true, activated_at = CURRENT_TIMESTAMP 
      WHERE id = ${licenses[0].id}
    `;

    return new Response(JSON.stringify({ success: true, message: 'Activated successfully' }), { status: 200 });
  } catch (error) {
    console.error('Activation error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
