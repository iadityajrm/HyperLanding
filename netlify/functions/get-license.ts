import { neon } from '@neondatabase/serverless';

export default async function handler(req: Request) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
    }

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      return new Response(JSON.stringify({ error: 'Database configuration missing' }), { status: 500 });
    }

    const sql = neon(databaseUrl);

    // Fetch passcode
    const licenses = await sql`
      SELECT passcode FROM licenses 
      WHERE email = ${email}
    `;

    if (licenses.length === 0) {
      return new Response(JSON.stringify({ error: 'License not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, passcode: licenses[0].passcode }), { status: 200 });
  } catch (error) {
    console.error('Database query error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
