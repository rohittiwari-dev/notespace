'use server';

import db from '@/db';
import { ErrorResponse, SuccessResponse } from '@/db/handlers';
import { IModule, IModuleInsert, ModuleTable } from '@/db/schemas';
import { and, DrizzleError, eq, ne } from 'drizzle-orm';

export const getModule = async (moduleId: string, fromTrash = false) => {
	try {
		const data = await db.query.ModuleTable.findMany({
			where: !fromTrash
				? and(
						eq(ModuleTable.id, moduleId),
						ne(ModuleTable.in_trash, true),
					)
				: and(
						eq(ModuleTable.id, moduleId),
						ne(ModuleTable.in_trash, false),
					),
			with: {
				files: true,
			},
		});

		if (!data[0]) {
			throw new Error('Workspace not found');
		}
		return SuccessResponse({
			data: data[0],
			message: 'Module fetched',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: (error as DrizzleError).message || 'Module not found',
		});
	}
};

export const getModules = async (workspaceId: string, fromTrash = false) => {
	try {
		const data = await db.query.ModuleTable.findMany({
			where: !fromTrash
				? and(
						eq(ModuleTable.workspace, workspaceId),
						ne(ModuleTable.in_trash, true),
					)
				: and(
						eq(ModuleTable.workspace, workspaceId),
						ne(ModuleTable.in_trash, false),
					),
			with: {
				files: true,
			},
		});
		return SuccessResponse({
			data,
			message: 'Modules fetched',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: (error as DrizzleError).message || 'Modules not found',
		});
	}
};
export const createModule = async (module: IModuleInsert) => {
	try {
		const data = await db.insert(ModuleTable).values(module).returning();

		if (!data[0]) {
			throw new Error('Module not created');
		}

		// Fetch the created module with files
		const moduleWithFiles = await db.query.ModuleTable.findFirst({
			where: eq(ModuleTable.id, data[0].id),
			with: {
				files: true,
			},
		});

		return SuccessResponse<IModule>({
			data: moduleWithFiles!,
			message: 'Module created',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: (error as DrizzleError).message?.includes(
				'duplicate key value violates unique constraint',
			)
				? 'Module already exists'
				: 'Module not created',
		});
	}
};

export const updateModule = async (
	moduleId: string,
	module: Partial<IModuleInsert>,
) => {
	try {
		const data = await db
			.update(ModuleTable)
			.set(module)
			.where(
				and(
					eq(ModuleTable.id, moduleId),
					ne(ModuleTable.in_trash, true),
				),
			)
			.returning();

		if (!data[0]) {
			throw new Error('Module not found');
		}

		// Fetch the updated module with files
		const moduleWithFiles = await db.query.ModuleTable.findFirst({
			where: eq(ModuleTable.id, data[0].id),
			with: {
				files: true,
			},
		});

		return SuccessResponse<IModule>({
			data: moduleWithFiles!,
			message: 'Module updated',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: (error as DrizzleError).message || 'Module not found',
		});
	}
};

export const hardDeleteModule = async (moduleId: string) => {
	try {
		const data = await db
			.delete(ModuleTable)
			.where(eq(ModuleTable.id, moduleId))
			.returning();

		if (!data[0]) {
			throw new Error('Module not found');
		}

		return SuccessResponse<IModule>({
			data: data[0],
			message: 'Module Deleted By Id',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: (error as DrizzleError).message || 'Module not found',
		});
	}
};

export const softDeleteModule = async (moduleId: string) => {
	try {
		const data = await db
			.update(ModuleTable)
			.set({ in_trash: true })
			.where(
				and(
					eq(ModuleTable.id, moduleId),
					ne(ModuleTable.in_trash, true),
				),
			)
			.returning();

		if (!data[0]) {
			throw new Error('Module not found');
		}

		// Fetch the updated module with files
		const moduleWithFiles = await db.query.ModuleTable.findFirst({
			where: eq(ModuleTable.id, data[0].id),
			with: {
				files: true,
			},
		});

		return SuccessResponse<IModule>({
			data: moduleWithFiles!,
			message: 'Module Deleted By Id',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: (error as DrizzleError).message || 'Module not found',
		});
	}
};

export const restoreModule = async (moduleId: string) => {
	try {
		const data = await db
			.update(ModuleTable)
			.set({ in_trash: false })
			.where(
				and(
					eq(ModuleTable.id, moduleId),
					ne(ModuleTable.in_trash, false),
				),
			)
			.returning();

		if (!data[0]) {
			throw new Error('No module found in trash with this id');
		}

		// Fetch the restored module with files
		const moduleWithFiles = await db.query.ModuleTable.findFirst({
			where: eq(ModuleTable.id, data[0].id),
			with: {
				files: true,
			},
		});

		return SuccessResponse<IModule>({
			data: moduleWithFiles!,
			message: 'Module Restored',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: (error as DrizzleError).message || 'Module not found',
		});
	}
};
