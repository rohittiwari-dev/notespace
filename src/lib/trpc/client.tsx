'use client';
import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink } from '@trpc/client';
import superjson from 'superjson';
import { getBaseUrl } from '@/lib/utils/getBaseUrl';
import { IS_DEV } from '@/lib/utils';
import createQueryClient from '@/lib/trpc/create-query-client';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server';

const trpc = createTRPCReact<AppRouter>();

let clientQueryClientSingleton: QueryClient | undefined = undefined;
function getQueryClient() {
	if (typeof window === 'undefined') {
		// Server: always make a new query client
		return createQueryClient();
	}
	// Browser: use singleton pattern to keep the same query client
	return (clientQueryClientSingleton ??= createQueryClient());
}

/**
 * The TRPC React Provider is a component that initializes trpc and react query.
 * @param props Props for the TRPC React Provider.
 * @param props.children The children of the TRPC React Provider, which would be
 *   the entire page/layout in most cases.
 * @returns React Provider component that initializes trpc and react query
 *   integration for the client.
 */
export function TRPCProvider(
	props: Readonly<{
		children: ReactNode;
	}>,
) {
	const queryClient = getQueryClient();

	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				loggerLink({
					enabled: (op) =>
						IS_DEV ||
						(op.direction === 'down' && op.result instanceof Error),
				}),
				httpBatchLink({
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
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				{props.children}
			</QueryClientProvider>
		</trpc.Provider>
	);
}

export default trpc;
