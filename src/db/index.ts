import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import * as ws from "ws";
import * as schema from "./schemas";

dotenv.config({ path: ".env" });

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
	console.log("🔴 no database URL");
}

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

export { schema };
export default db;
