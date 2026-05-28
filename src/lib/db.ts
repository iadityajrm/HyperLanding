import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("DATABASE_URL environment variable is missing! Queries will fall back to simulation mode.");
}

// Export the sql query tool. In development without DATABASE_URL,
// we will intercept queries to prevent crashing, allowing smooth previews.
export const sql = databaseUrl 
  ? neon(databaseUrl)
  : (() => {
      console.warn("DATABASE_URL is not set. Database queries will be simulated.");
      return (async (strings: TemplateStringsArray, ...values: any[]) => {
        console.log("Mock SQL Query:", strings.join("?"), values);
        return [] as any[];
      }) as any;
    })();

// Automatically initialize database schema DDL
export async function initDatabase() {
  if (!databaseUrl) return;
  try {
    const query = neon(databaseUrl);
    await query`
      CREATE TABLE IF NOT EXISTS licenses (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        passcode VARCHAR(6) NOT NULL UNIQUE,
        activated BOOLEAN DEFAULT FALSE,
        activated_at TIMESTAMP WITH TIME ZONE NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Neon licenses table check/creation completed successfully.");
  } catch (err) {
    console.error("Neon database schemas auto-init failed:", err);
  }
}
