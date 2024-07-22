import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "./schema";

// Dot env Config
dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) console.log("🔴 No Database Url Found");
// Creating Postgres Client
const client = postgres(process.env.DATABASE_URL!, { max: 1 });
// Creating Drizzle Client Wrapping Postgres
const db = drizzle(client, { schema });

// Export of Drizzle Client to connect db and drizzle executions
export default db;
