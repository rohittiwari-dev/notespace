'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loggerLink, httpBatchStreamLink } from '@trpc/client';
import superjson from 'superjson';
import { getBaseUrl } from '@/utils/getBaseUrl';
import { api } from '@/lib/trpc/client';
import { IS_DEV } from '@/utils';

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const createQueryClient = () => clientQueryClientSingleton ?? new QueryClient();

const getQueryClient = () => {
	if (!clientQueryClientSingleton || typeof window === 'undefined') {
		clientQueryClientSingleton = createQueryClient();
		return clientQueryClientSingleton;
	}
	return clientQueryClientSingleton;
};

/**
 * The TRPC React Provider is a component that initializes trpc and react query.
 * @param props Props for the TRPC React Provider.
 * @param props.children The children of the TRPC React Provider, which would be
 *   the entire page/layout in most cases.
 * @returns React Provider component that initializes trpc and react query
 *   integration for the client.
 */
export function TRPCProvider(props: { children: React.ReactNode }) {
	const [queryClient] = useState(() => getQueryClient());

	const [trpcClient] = useState(() =>
		api.createClient({
			links: [
				loggerLink({
					enabled: (op) =>
						IS_DEV ||
						(op.direction === 'down' && op.result instanceof Error),
				}),
				httpBatchStreamLink({
					transformer: superjson,
					url: `${getBaseUrl()}/api/trpc`,
					headers: () => {
						const headers = new Headers();
						headers.set('x-trpc-source', 'nextjs-react');
						return headers;
					},
				}),
			],
		}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<api.Provider client={trpcClient} queryClient={queryClient}>
				{props.children}
			</api.Provider>
		</QueryClientProvider>
	);
}
