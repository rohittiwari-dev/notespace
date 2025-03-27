import { headers } from 'next/headers';
import { authServerApi } from './server';

export const getServerSession = async () => {
	const session = await authServerApi.api.getSession({
		headers: await headers(),
	});
	return session;
};

export const getLoggedInUser = async () => {
	const session = await getServerSession();
	return session?.user;
};
