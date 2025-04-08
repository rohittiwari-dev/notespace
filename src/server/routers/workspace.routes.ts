import {
	createWorkspace,
	hardDeleteWorkspace,
	getWorkspace,
	getWorkspaces,
	updateWorkspace,
	softDeleteWorkspace,
} from '@/server/actions/repositories/space.repo';
import authProcedure from '../procedures/protectedProcedure';
import { createRouter } from '../trpc';

import cloudinary from '@/lib/utils/coudinary';
import { z } from 'zod';
import { validators } from '@/db';
import { createId, isCuid } from '@paralleldrive/cuid2';

const workspaceRouter = createRouter({
	createWorkspace: authProcedure
		.input(
			validators.IWorkspaceInsertSchema.extend({
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
			const workspace = await createWorkspace(newWorkspace);
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

	updateWorkspace: authProcedure
		.input(
			z.object({
				workspaceId: z.string(),
				workspace: validators.IWorkspaceUpdateSchema.extend({
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
						.nullable()
						.optional(),
				}),
			}),
		)
		.mutation(async ({ input }) => {
			const { workspaceId, workspace } = input;
			console.log('input', input);
			const workspaceData = await getWorkspace(workspaceId);
			if (!workspaceData) {
				throw new Error('Workspace not found');
			}
			const { logo_public_id } = workspaceData.data;
			if (logo_public_id) {
				await cloudinary.uploader.destroy(logo_public_id);
			}
			const { logo } = workspace;
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
			const updateWorkspaceObject = {
				...workspace,
				logo: uploadResult ? uploadResult.secure_url : undefined,
				logo_public_id: uploadResult?.public_id,
				id: undefined,
			};
			const updatedWorkspace = await updateWorkspace(
				workspaceId,
				updateWorkspaceObject,
			);
			return updatedWorkspace.data;
		}),
	removeLogo: authProcedure
		.input(z.object({ workspaceId: z.string() }))
		.mutation(async ({ input }) => {
			const { workspaceId } = input;
			const workspaceData = await getWorkspace(workspaceId);
			if (!workspaceData) {
				throw new Error('Workspace not found');
			}
			const { logo_public_id } = workspaceData.data;
			if (logo_public_id) {
				await cloudinary.uploader.destroy(logo_public_id);
			}
			const updatedWorkspace = await updateWorkspace(workspaceId, {
				logo: null,
				logo_public_id: null,
			});
			return updatedWorkspace.data;
		}),
	softDeleteWorkspace: authProcedure
		.input(z.string().refine((val) => isCuid(val)))
		.mutation(async ({ input }) => {
			const { data: workspace } = await getWorkspace(input);
			if (!workspace) throw new Error('Workspace not found');
			const { data } = await softDeleteWorkspace(workspace.id);
			return data;
		}),
	hardDeleteWorkspace: authProcedure
		.input(z.string().refine((val) => isCuid(val)))
		.mutation(async ({ input }) => {
			const { data: workspace } = await getWorkspace(input);
			if (!workspace) throw new Error('Workspace not found');
			const { data } = await hardDeleteWorkspace(workspace.id);
			if (data?.logo_public_id) {
				await cloudinary.uploader.destroy(data.logo_public_id);
			}
			return data;
		}),
});

export default workspaceRouter;
