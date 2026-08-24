import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn(
    "DATABASE_URL is not defined. Comments will not work until it is configured."
  );
}

export const sql = databaseUrl ? neon(databaseUrl) : null;
