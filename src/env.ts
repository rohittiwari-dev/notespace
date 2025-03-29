import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import { vercel } from '@t3-oss/env-nextjs/presets-zod';
import { StandardSchemaV1 } from '@t3-oss/env-core';

export const env = createEnv({
	extends: [vercel()],
	shared: {
		NODE_ENV: z
			.enum(['development', 'production', 'test'])
			.default('development'),
		WEB_PUBLIC_URL: z.string(),
	},
	server: {
		PORT: z.coerce.number().default(3000),
		DATABASE_URL: z.string().url(),
		RESEND_API_KEY: z.string(),
		REDIS_URL: z.string().url(),
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
		BETTER_AUTH_URL: z.string(),
		IP_BANLIST: z.string().optional(),
		CLOUDINARY_CLOUD_NAME: z.string(),
		CLOUDINARY_API_KEY: z.string(),
		CLOUDINARY_API_SECRET: z.string(),
	},
	client: {},
	experimental__runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		WEB_PUBLIC_URL: process.env['NEXT_PUBLIC_WEB_PUBLIC_URL'],
	},
	skipValidation: !!process.env['SKIP_ENV_VALIDATION'],
	isServer: typeof window === 'undefined',
	emptyStringAsUndefined: true,
	onValidationError: (issues: readonly StandardSchemaV1.Issue[]) => {
		console.error(
			'❌ Invalid environment variables:',
			JSON.stringify(issues, null, 2),
		);
		process.exit(1);
	},
	// Called when server variables are accessed on the client.
	onInvalidAccess: (variable: string) => {
		console.error(
			`❌ Attempted to access a server-side environment variable "${variable}" on the client`,
		);
		process.exit(1);
	},
});
