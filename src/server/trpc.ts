import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { getServerSession } from '@/server/actions/auth.actions';
import { cache } from 'react';
import db from '@/db';

export const createTRPCContext = cache(async (opts: { headers: Headers }) => {
	const session = await getServerSession(opts.headers);
	return {
		user: session?.user,
		session: session,
		db,
		...opts,
	};
});

interface CommonError {
	code: string;
	message: string;
	issues?: Array<any>;
	timestamp?: string;
}
function formatZodError(error: ZodError): CommonError {
	const errors = error.errors.map(
		(error) => `${error.path.join('.')}: ${error.message}`,
	);
	return {
		code: 'BAD_REQUEST',
		message: `Invalid input data: [${errors.join(', ')}]`,
		issues: error.errors,
	};
}

const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.cause instanceof ZodError
						? formatZodError(error.cause)
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
