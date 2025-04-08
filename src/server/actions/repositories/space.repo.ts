'use server';
import { and, DrizzleError, eq, ne } from 'drizzle-orm';
import db from '@/db';
import {
	IWorkSpace,
	type IWorkSpaceInsert,
	WorkspaceTable,
} from '@/db/schemas';
import { ErrorResponse, SuccessResponse } from '@/db/handlers';

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
			message: (error as DrizzleError).message || 'Workspace not found',
		});
	}
};

export const createWorkspace = async (workspace: IWorkSpaceInsert) => {
	try {
		const data = await db
			.insert(WorkspaceTable)
			.values(workspace)
			.returning();

		if (!data[0]) {
			throw new Error('Space not created');
		}
		return SuccessResponse<IWorkSpace>({
			data: data[0],
			message: 'Space created',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: (error as DrizzleError).message?.includes(
				'duplicate key value violates unique constraint',
			)
				? 'Space already exists'
				: 'Space not created',
		});
	}
};

export const getWorkspace = async (workspaceId: string) => {
	try {
		const data = await db
			.select()
			.from(WorkspaceTable)
			.where(
				and(
					eq(WorkspaceTable.id, workspaceId),
					ne(WorkspaceTable.in_trash, true),
				),
			);
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
			message: (error as DrizzleError).message || 'Workspace not found',
		});
	}
};

export const updateWorkspace = async (
	workspaceId: string,
	workspace: Partial<IWorkSpaceInsert>,
) => {
	try {
		const data = await db
			.update(WorkspaceTable)
			.set(workspace)
			.where(
				and(
					eq(WorkspaceTable.id, workspaceId),
					ne(WorkspaceTable.in_trash, true),
				),
			)
			.returning();

		if (!data[0]) {
			throw new Error('Workspace not found');
		}

		return SuccessResponse<IWorkSpace>({
			data: data[0],
			message: 'Workspace updated',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: (error as DrizzleError).message || 'Workspace not found',
		});
	}
};

export const hardDeleteWorkspace = async (workspaceId: string) => {
	try {
		const data = await db
			.delete(WorkspaceTable)
			.where(eq(WorkspaceTable.id, workspaceId))
			.returning();

		if (!data[0]) {
			throw new Error('Workspace not found');
		}

		return SuccessResponse<IWorkSpace>({
			data: data[0],
			message: 'Workspace Deleted By Id',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: (error as DrizzleError).message || 'Workspace not found',
		});
	}
};

export const softDeleteWorkspace = async (workspaceId: string) => {
	try {
		const data = await db
			.update(WorkspaceTable)
			.set({ in_trash: true })
			.where(
				and(
					eq(WorkspaceTable.id, workspaceId),
					ne(WorkspaceTable.in_trash, true),
				),
			)
			.returning();

		if (!data[0]) {
			throw new Error('Workspace not found');
		}

		return SuccessResponse<IWorkSpace>({
			data: data[0],
			message: 'Workspace Deleted By Id',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: (error as DrizzleError).message || 'Workspace not found',
		});
	}
};
