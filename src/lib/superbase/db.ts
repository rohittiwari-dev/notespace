import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "../../../migrations/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";

// Dot env Config
dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) console.log("🔴 No Database Url Found");

// Creating Postgres Client
const client = postgres(process.env.DATABASE_URL!, { max: 1 });
// Creating Drizzle Client Wrapping Postgres
const db = drizzle(client, { schema });
// Creation Migration Function to migrate all Database Schemas
const migrateDb = async () => {
	try {
		console.log("🟡 Migrating Client");
		await migrate(db, { migrationsFolder: "migrations" });
		console.log("🟢 Migration Successful");
	} catch (error) {
		console.log("🔴 Error Migrating the Schemas");
	}
};
// Executing Migration Functions
migrateDb();

// Export of Drizzle Client to connect db and drizzle executions
export default db;
