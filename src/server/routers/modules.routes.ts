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
import {
	createNewFiles,
	deleteFileById,
	updateFileById,
} from '../actions/repositories/files.repo';
import z from 'zod';
import { IFileInsertSchema, IFileSelectSchema } from '@/db/validators';

const moduleRouter = createRouter({
	getModules: authProcedure
		.input(z.object({ workspaceId: z.cuid2() }))
		.query(async ({ input }) => {
			const { workspaceId } = input;
			const modules = await getModules(workspaceId);
			return modules.data;
		}),
	getModule: authProcedure
		.input(z.object({ moduleId: z.cuid2() }))
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
			const moduleId = createId();
			if (logo)
				uploadResult = await cloudinary.uploader.upload(
					`data:image/png;base64,${logo?.fileData}`,
					{
						folder: 'module_logos',
						public_id: `logo:${moduleId}`,
						overwrite: true,
					},
				);
			const newWorkspace = {
				id: moduleId,
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
				moduleId: z.cuid2(),
			}),
		)
		.mutation(async ({ input }) => {
			const { moduleId } = input;
			const moduleData = await getModule(moduleId, true);
			if (!moduleData) {
				throw new Error('Module not found');
			}
			const { data } = await restoreModule(moduleId);
			return data;
		}),
	getTrashItems: authProcedure
		.input(z.object({ workspaceId: z.cuid2() }))
		.query(async ({ input }) => {
			const { workspaceId } = input;
			const modules = await getModules(workspaceId, true);
			return modules.data;
		}),
	addNewFile: authProcedure
		.input(
			z.object({
				moduleId: z.cuid2(),
				file: IFileInsertSchema,
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const { moduleId, file } = input;
			const { data: module } = await getModule(moduleId);
			if (!module) throw new Error('Module not found');
			const newFile = await createNewFiles({
				...file,
				data: file?.data as Array<{ [key: string]: any }>,
				owner: ctx.user!.id,
				workspace: module.workspace,
				module: module.id,
			});
			return newFile.data;
		}),
	updateFile: authProcedure
		.input(
			z.object({
				moduleId: z.cuid2(),
				fileId: z.cuid2(),
				file: IFileSelectSchema.extend({
					cover: z
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
				}).optional(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const { moduleId, fileId, file } = input;
			const { data: module } = await getModule(moduleId);
			if (!module) throw new Error('Module not found');
			let uploadResult;
			if (file?.cover) {
				uploadResult = await cloudinary.uploader.upload(
					`data:image/png;base64,${file?.cover?.fileData}`,
					{
						folder: 'file_cover',
						public_id: `cover:${fileId}`,
						overwrite: true,
					},
				);
				const currentFile = module.files.find((f) => f.id === fileId);
				if (currentFile?.coverPublicId && currentFile?.cover) {
					await cloudinary.uploader.destroy(
						currentFile.coverPublicId,
					);
				}
			}
			const updatedFile = await updateFileById(fileId, {
				...file,
				data: file?.data as Array<{ [key: string]: any }>,
				cover: uploadResult ? uploadResult.secure_url : undefined,
				owner: ctx.user!.id,
				workspace: module.workspace,
				coverPublicId: uploadResult?.public_id || '',
				module: module.id,
			});
			return updatedFile.data;
		}),
	deleteFile: authProcedure
		.input(
			z.object({
				moduleId: z.cuid2(),
				fileId: z.cuid2(),
			}),
		)
		.mutation(async ({ input }) => {
			const { moduleId, fileId } = input;
			const { data: module } = await getModule(moduleId);
			if (!module) throw new Error('Module not found');
			const deletedFile = await deleteFileById(fileId);
			return deletedFile.data;
		}),
});

export default moduleRouter;
