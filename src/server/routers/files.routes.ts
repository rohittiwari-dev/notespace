import z from 'zod';
import authProcedure from '../procedures/protectedProcedure';
import { createRouter } from '../trpc';
import { getRecentFiles } from '../actions/repositories/files.repo';

const fileRouter = createRouter({
	getRecentFiles: authProcedure
		.input(
			z.object({
				workspaceId: z.cuid2(),
				limit: z.number().optional().default(6),
			}),
		)
		.query(async ({ input }) => {
			const { workspaceId, limit } = input;
			const files = await getRecentFiles(workspaceId, limit);
			return files.data;
		}),
});

export default fileRouter;
