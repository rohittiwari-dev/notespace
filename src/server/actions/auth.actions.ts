'use server';
import { headers } from 'next/headers';
import { authServerApi } from '@/lib/auth/server';
import { cache } from 'react';

export const getServerSession = cache(async (argsHeaders?: Headers) => {
	const session = await authServerApi.api.getSession({
		headers: argsHeaders ?? (await headers()),
	});
	return session;
});

export const getLoggedInUser = cache(async (argsHeaders?: Headers) => {
	const session = await getServerSession(argsHeaders);
	return session?.user;
});
