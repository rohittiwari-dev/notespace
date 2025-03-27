import {
	createWorkspace,
	getWorkspace,
	getWorkspaces,
} from '@/db/repositories/space.repo';
import authProcedure from '../procedures/protectedProcedure';
import { createRouter } from '../trpc';
import { validators } from '@/db';

import { z } from 'zod';

const workspaceRouter = createRouter({
	createWorkspace: authProcedure
		.input(validators.IWorkspaceInsertSchema)
		.mutation(async ({ input }) => {
			const workspace = await createWorkspace(input);
			return workspace.data;
		}),
	getWorkspaces: authProcedure
		.input(z.object({ userId: z.string() }))
		.query(async ({ input }) => {
			const workspaces = await getWorkspaces(input.userId);
			return workspaces.data;
		}),
	getWorkspace: authProcedure
		.input(z.object({ workspaceId: z.string() }))
		.query(async ({ input }) => {
			const workspace = await getWorkspace(input.workspaceId);
			return workspace.data;
		}),
});

export default workspaceRouter;
