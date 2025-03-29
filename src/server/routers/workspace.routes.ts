import {
	createWorkspace,
	getWorkspace,
	getWorkspaces,
} from '@/db/repositories/space.repo';
import authProcedure from '../procedures/protectedProcedure';
import { createRouter } from '../trpc';
import { validators } from '@/db';
import cloudinary from '@/utils/coudinary';
import { z } from 'zod';

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
						public_id: logo?.fileName.split('.')[0], // Remove file extension for public_id
						overwrite: true,
					},
				);
			const newWorkspace = {
				...input,
				logo: uploadResult ? uploadResult.secure_url : undefined,
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
});

export default workspaceRouter;
