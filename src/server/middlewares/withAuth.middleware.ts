import { TRPCError } from '@trpc/server';
import { createMiddleware } from '../trpc';

export const withAuth = createMiddleware(async ({ ctx, next }) => {
	if (!ctx.session) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return next({
		ctx: {
			session: ctx.session,
		},
	});
});

export default withAuth;
