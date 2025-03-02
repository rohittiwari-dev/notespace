import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import type { NextRequest } from "next/server";
import { env } from "@/env";
import { createTRPCContext } from "@/server/trpc";
import { appRouter } from "@/server";

// export const runtime = "edge"; // Optional for Edge runtime
const createContextNext = (req: NextRequest) => {
	return createTRPCContext({
		headers: req.headers,
	});
};

const handler = (req: NextRequest) =>
	fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router: appRouter,
		createContext: () => createContextNext(req),
		onError: ({ path, error }) => {
			if (env.NODE_ENV === "development") {
				console.error(
					`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
				);
			}
		},
	});

export { handler as GET, handler as POST };
