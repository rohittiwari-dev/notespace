// Client Auth
import { createAuthClient } from "better-auth/react";
import { nextCookies } from "better-auth/next-js";

export const authClientApi = createAuthClient({
	baseURL: process.env.BETTER_AUTH_URL,
	plugins: [nextCookies()],
});
