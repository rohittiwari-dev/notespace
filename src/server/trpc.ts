import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { authServerApi } from "@/lib/auth/server";

export const createTRPCContext = async (opts: { headers: Headers }) => {
	const session = await authServerApi.api.getSession({
		headers: opts.headers,
	});
	return {
		user: session?.user,
		session: session,
		...opts,
	};
};

const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.cause instanceof ZodError
						? error.cause.flatten()
						: null,
			},
		};
	},
});
// Base router and procedure helpers
export const createRouter = t.router;
export const createMiddleware = t.middleware;
export const mergeRouters = t.mergeRouters;
export const createCallerFactory = t.createCallerFactory;
export const createProcedure = t.procedure;

export default t;
