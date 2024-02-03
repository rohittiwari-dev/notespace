/* All Required Imports */
import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// Dotenv Config
dotenv.config({ path: ".env" });

// Checking if Database url is there or not
if (!process.env.DATABASE_URL) console.log("🔴 Cannot Find Database Url");

// Creating Drizzle Configuration to connect to the Database
export default {
	schema: "./src/lib/superbase/schema.ts",
	out: "./migrations",
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.DATABASE_URL!,
	},
} satisfies Config;
