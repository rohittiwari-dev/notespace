import 'server-only';
import { cache } from 'react';
import { headers } from 'next/headers';

import { appRouter, createCaller } from '@/server';
import { createTRPCContext } from '@/server/trpc';
import { createHydrationHelpers } from '@trpc/react-query/rsc';
import createQueryClient from '@/lib/trpc/create-query-client';

const createContext = cache(async () => {
	const heads = new Headers(await headers());
	return createTRPCContext({
		headers: heads,
	});
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);
const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
	caller,
	getQueryClient,
);

export { HydrateClient };
export default trpc;
