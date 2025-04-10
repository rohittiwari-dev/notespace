import { z } from 'zod';
import authProcedure from '../procedures/protectedProcedure';
import { createRouter } from '../trpc';

import {
	createModule,
	getModule,
	getModules,
} from '../actions/repositories/module.repo';
import { validators } from '@/db';
import { createId } from '@paralleldrive/cuid2';
import cloudinary from '@/lib/utils/coudinary';

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
	createModule: authProcedure
		.input(
			validators.IModuleInsertSchema.extend({
				logo: z
					.object({
						fileName: z.string(),
						fileType: z.string(),
						fileData: z.string(),
						fileSize: z
							.number()
							.max(
								5 * 1024 * 1024,
								'File size must be under 5MB',
							), // 5MB limit
					})
					.optional(),
			}),
		)
		.mutation(async ({ input }) => {
			const { logo } = input;
			let uploadResult;
			if (logo)
				uploadResult = await cloudinary.uploader.upload(
					`data:image/png;base64,${logo?.fileData}`,
					{
						folder: 'workspace_logos',
						public_id: `${logo?.fileName.split('.')[0]}-${createId()}`,
						overwrite: true,
					},
				);
			const newWorkspace = {
				...input,
				logo: uploadResult ? uploadResult.secure_url : undefined,
				logo_public_id: uploadResult?.public_id,
			};
			const workspace = await createModule(newWorkspace);
			return workspace.data;
		}),
});

export default moduleRouter;
