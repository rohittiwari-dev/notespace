"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import superjson from "superjson";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { api } from "@/lib/trpc/client";

const createQueryClient = () => new QueryClient();

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
	if (typeof window === "undefined") {
		return createQueryClient();
	}
	return (clientQueryClientSingleton ??= createQueryClient());
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
	const queryClient = getQueryClient();

	const [trpcClient] = useState(() =>
		api.createClient({
			links: [
				loggerLink({
					enabled: (op) =>
						process.env.NODE_ENV === "development" ||
						(op.direction === "down" && op.result instanceof Error),
				}),
				unstable_httpBatchStreamLink({
					transformer: superjson,
					url: `${getBaseUrl()}/api/trpc`,
					headers: () => {
						const headers = new Headers();
						headers.set("x-trpc-source", "nextjs-react");
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
