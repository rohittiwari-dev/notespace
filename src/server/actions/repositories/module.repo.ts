'use server';

import db from '@/db';
import { ErrorResponse, SuccessResponse } from '@/db/handlers';
import { IModule, ModuleTable } from '@/db/schemas';
import { DrizzleError, eq } from 'drizzle-orm';

export const getModule = async (moduleId: string) => {
	try {
		const data = await db
			.select()
			.from(ModuleTable)
			.where(eq(ModuleTable.id, moduleId));
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

export const getModules = async (workspaceId: string) => {
	try {
		const data = await db
			.select()
			.from(ModuleTable)
			.where(eq(ModuleTable.workspace, workspaceId));
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
export const createModule = async (module: IModule) => {
	try {
		const data = await db.insert(ModuleTable).values(module).returning();
		return SuccessResponse({
			data: data[0],
			message: 'Module created',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: (error as DrizzleError).message || 'Module not created',
		});
	}
};
