import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import { vercel } from "@t3-oss/env-nextjs/presets-zod";

export const env = createEnv({
	extends: [vercel()],
	shared: {
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),
		VERCEL_URL: z.string().url().default("http://localhost:3000"),
	},
	server: {
		DATABASE_URL: z.string().url(),
		PORT: z.coerce.number().default(3000),
		RESEND_API_KEY: z.string(),
		// Google Auth Credentials
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
		// Better Auth
		BETTER_AUTH_URL: z.string(),
	},
	client: {},
	experimental__runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV!,
		VERCEL_URL: process.env.VERCEL_URL!,
	},
	skipValidation: !!process.env["SKIP_ENV_VALIDATION"],
	isServer: typeof window === "undefined",
	emptyStringAsUndefined: true,
	onValidationError: (issues: any) => {
		console.error("❌ Invalid environment variables:", issues);
		throw new Error("Invalid environment variables");
	},
	// Called when server variables are accessed on the client.
	onInvalidAccess: (variable: string) => {
		throw new Error(
			`❌ Attempted to access a server-side environment variable ${variable} on the client`,
		);
	},
});
