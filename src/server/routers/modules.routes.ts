import { z } from 'zod';
import authProcedure from '../procedures/protectedProcedure';
import { createRouter } from '../trpc';

import {
	createModule,
	getModule,
	getModules,
	hardDeleteModule,
	restoreModule,
	softDeleteModule,
} from '../actions/repositories/module.repo';
import { validators } from '@/db';
import { createId } from '@orama/cuid2';
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
	softDeleteWorkspace: authProcedure
		.input(z.string().cuid2())
		.mutation(async ({ input }) => {
			const { data: module } = await getModule(input);
			if (!module) throw new Error('Workspace not found');
			const { data } = await softDeleteModule(module.id);
			return data;
		}),
	hardDeleteWorkspace: authProcedure
		.input(z.string().cuid2())
		.mutation(async ({ input }) => {
			const { data: module } = await getModule(input);
			if (!module) throw new Error('Module not found');
			const { data } = await hardDeleteModule(module.id);
			if (data?.logo_public_id) {
				await cloudinary.uploader.destroy(data.logo_public_id);
			}
			return data;
		}),
	restoreModule: authProcedure
		.input(
			z.object({
				moduleId: z.string().cuid2(),
			}),
		)
		.mutation(async ({ input }) => {
			const { moduleId } = input;
			const moduleData = await getModule(moduleId, true);
			if (!moduleData) {
				throw new Error('Module not found');
			}
			const { data } = await restoreModule(moduleId);
			if (data?.logo_public_id) {
				await cloudinary.uploader.destroy(data.logo_public_id);
			}
			return data;
		}),
	getTrashItems: authProcedure
		.input(z.object({ workspaceId: z.string().cuid2() }))
		.query(async ({ input }) => {
			const { workspaceId } = input;
			const modules = await getModules(workspaceId, true);
			return modules.data;
		}),
});

export default moduleRouter;
