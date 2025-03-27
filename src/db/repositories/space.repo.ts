'use server';
import { and, DrizzleError, eq, ne } from 'drizzle-orm';
import db from '..';
import { type IWorkSpaceInsert, IWorkSpace, WorkspaceTable } from '../schemas/';
import { ErrorResponse, SuccessResponse } from '../handlers';

export const getWorkspaces = async (userId: string) => {
	try {
		const data = await db
			.select()
			.from(WorkspaceTable)
			.where(
				and(
					eq(WorkspaceTable.owner, userId),
					ne(WorkspaceTable.in_trash, true),
				),
			);
		return SuccessResponse<IWorkSpace[]>({
			data,
			message: 'Spaces fetched',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: 'Spaces not found',
		});
	}
};

export const createWorkspace = async (workspace: IWorkSpaceInsert) => {
	try {
		const data = await db.insert(WorkspaceTable).values(workspace);
		if (!data.rows[0]) {
			throw new Error('Space not created');
		}
		return SuccessResponse<IWorkSpace>({
			data: data.rows[0],
			message: 'Space created',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: 'Space not created',
		});
	}
};

export const getWorkspace = async (workspaceId: string) => {
	try {
		const data = await db
			.select()
			.from(WorkspaceTable)
			.where(eq(WorkspaceTable.id, workspaceId));
		if (!data[0]) {
			throw new Error('Workspace not found');
		}
		return SuccessResponse<IWorkSpace>({
			data: data[0],
			message: 'Workspace fetched',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: 'Workspace not found',
		});
	}
};
