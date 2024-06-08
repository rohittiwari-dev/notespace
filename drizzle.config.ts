/* All Required Imports */
import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Dotenv Config
dotenv.config({ path: [".env.local", ".env"] });

// Checking if Database url is there or not
if (!process.env.DATABASE_URL) console.log("🔴 Cannot Find Database Url");

// Creating Drizzle Configuration to connect to the Database
export default defineConfig({
	schema: "./src/lib/supabase/schema.ts",
	out: "./migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL as string,
	},
});
