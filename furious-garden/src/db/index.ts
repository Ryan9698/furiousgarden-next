import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// For Supabase hosted Postgres, require SSL
const client = postgres(process.env.DATABASE_URL!, {
  ssl: "require",
  max: 1, // keep it low in serverless environments
});

export const db = drizzle(client, { schema });
export type DB = typeof db;
