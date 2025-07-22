import { betterAuth, type BetterAuthOptions } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';

import db, { schema } from '@/db';
import { env } from '@/env';
import { sendEmail } from '@/lib/emails';

import { nextCookies } from 'better-auth/next-js';

// Server Auth
export const authServerApi = betterAuth({
	appName: 'Notespace',
	account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ['google', 'microsoft'],
			allowDifferentEmails: true,
		},
	},
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: {
			...schema,
			user: schema.UserTable,
			account: schema.ConnectedAuthProvidersTable,
			session: schema.UserAuthSessionTable,
			verification: schema.UserAuthVerificationTable,
		},
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url }) => {
			await sendEmail({
				to: user.email,
				subject: 'Reset Your Password | Notespace',
				text: `Click the link to verify your email: ${url}`,
			});
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url }) => {
			await sendEmail({
				to: user.email,
				subject: 'Verify your email address | Notespace',
				text: `Click the link to verify your email: ${url}`,
			});
		},
	},
	socialProviders: {
		google: {
			disableImplicitSignUp: true,
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
	onAPIError: {
		errorURL: '/sign-in',
	},
	// secondaryStorage: {
	// get: async (key) => {
	// 	const value = await redis.get(key);
	// 	return value ? value : null;
	// },
	// set: async (key, value, ttl) => {
	// 	if (ttl) await redis.set(key, value, 'EX', ttl);
	// 	else await redis.set(key, value);
	// },
	// delete: async (key) => {
	// 	await redis.del(key);
	// },
	// },
	plugins: [openAPI(), nextCookies()],
} satisfies BetterAuthOptions);
