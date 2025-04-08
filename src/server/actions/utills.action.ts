'use server';

import { cookies } from 'next/headers';

export async function cookiesHandler(
	cookieStore?: Awaited<ReturnType<typeof cookies>>,
) {
	'use server';
	let store = cookieStore;
	if (!store) store = await cookies();
	return {
		store: store,
		get: (key: string) => {
			const cookie = store.get(key);
			if (!cookie) return null;
			return cookie.value;
		},
		set: (key: string, value: string) => {
			return store.set(key, value);
		},
	};
}
