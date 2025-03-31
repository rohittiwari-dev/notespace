import {
	createWorkspace,
	getWorkspace,
	getWorkspaces,
} from '@/server/actions/repositories/space.repo';
import authProcedure from '../procedures/protectedProcedure';
import { createRouter } from '../trpc';

import cloudinary from '@/lib/utils/coudinary';
import { z } from 'zod';
import { validators } from '@/db';
import { createId } from '@paralleldrive/cuid2';

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
});

export default workspaceRouter;
