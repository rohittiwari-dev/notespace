// Client Auth
import { createAuthClient } from 'better-auth/react';
import { getBaseUrl } from '@/lib/utils/getBaseUrl';
import { nextCookies } from 'better-auth/next-js';

export const authClientApi = createAuthClient({
	baseURL: getBaseUrl(),
	plugins: [nextCookies()],
});
