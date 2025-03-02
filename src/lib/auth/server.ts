import { betterAuth, BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db, { schema } from "@/db";
import { openAPI } from "better-auth/plugins";
import { sendEmail } from "@/lib/emails";

// Server Auth
export const authServerApi = betterAuth({
	appName: "Notespace",
	database: drizzleAdapter(db, {
		provider: "pg",
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
				subject: "Reset Your Password | Notespace",
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
				subject: "Verify your email address | Notespace",
				text: `Click the link to verify your email: ${url}`,
			});
		},
	},
	socialProviders: {
		google: {
			disableSignUp: true,
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	onAPIError: {
		errorURL: "/sign-in",
	},
	plugins: [openAPI()],
} satisfies BetterAuthOptions);
