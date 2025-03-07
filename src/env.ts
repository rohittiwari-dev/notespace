import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-nextjs/presets-zod';
import { z } from 'zod';

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
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
		BETTER_AUTH_URL: z.string(),
		IP_BANLIST: z.string().optional(),
	},
	client: {},
	experimental__runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		WEB_PUBLIC_URL: process.env['NEXT_PUBLIC_WEB_PUBLIC_URL'],
	},
	skipValidation: !!process.env['SKIP_ENV_VALIDATION'],
	isServer: typeof window === 'undefined',
	emptyStringAsUndefined: true,
	onValidationError: (issues: unknown) => {
		console.error('❌ Invalid environment variables:', issues);
		throw new Error('Invalid environment variables');
	},
	// Called when server variables are accessed on the client.
	onInvalidAccess: (variable: string) => {
		throw new Error(
			`❌ Attempted to access a server-side environment variable ${variable} on the client`,
		);
	},
});
