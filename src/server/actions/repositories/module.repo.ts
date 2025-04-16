'use server';

import db from '@/db';
import { ErrorResponse, SuccessResponse } from '@/db/handlers';
import { IModule, IModuleInsert, ModuleTable } from '@/db/schemas';
import { and, DrizzleError, eq, ne } from 'drizzle-orm';

export const getModule = async (moduleId: string, fromTrash = false) => {
	try {
		const data = await db
			.select()
			.from(ModuleTable)
			.where(
				!fromTrash
					? and(
							eq(ModuleTable.id, moduleId),
							ne(ModuleTable.in_trash, true),
						)
					: and(
							eq(ModuleTable.id, moduleId),
							ne(ModuleTable.in_trash, false),
						),
			);
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
		const data = await db
			.select()
			.from(ModuleTable)
			.where(
				!fromTrash
					? and(
							eq(ModuleTable.workspace, workspaceId),
							ne(ModuleTable.in_trash, true),
						)
					: and(
							eq(ModuleTable.workspace, workspaceId),
							ne(ModuleTable.in_trash, false),
						),
			);
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
		return SuccessResponse<IModuleInsert>({
			data: data[0],
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

		return SuccessResponse<IModule>({
			data: data[0],
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

		return SuccessResponse<IModule>({
			data: data[0],
			message: 'Module Restored',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: (error as DrizzleError).message || 'Module not found',
		});
	}
};
