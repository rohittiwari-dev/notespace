import { z } from 'zod';
import authProcedure from '../procedures/protectedProcedure';
import { createRouter } from '../trpc';

import { getModule, getModules } from '../actions/repositories/module.repo';

const moduleRouter = createRouter({
	getModules: authProcedure
		.input(z.object({ workspaceId: z.string().cuid2() }))
		.query(async ({ input }) => {
			const { workspaceId } = input;
			const modules = await getModules(workspaceId);
			return modules.data;
		}),
	getModule: authProcedure
		.input(z.object({ moduleId: z.string().cuid2() }))
		.query(async ({ input }) => {
			const { moduleId } = input;
			const modules = await getModule(moduleId);
			return modules.data;
		}),
});

export default moduleRouter;
