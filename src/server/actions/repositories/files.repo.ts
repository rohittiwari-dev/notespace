import db from '@/db';
import { ErrorResponse, SuccessResponse } from '@/db/handlers';
import { FileTable, IFileInsert } from '@/db/schemas';
import { DrizzleError, eq } from 'drizzle-orm';

export const createNewFiles = async (file: IFileInsert) => {
	try {
		const data = await db.insert(FileTable).values(file).returning();

		if (!data[0]) {
			throw new Error('File not created');
		}

		return SuccessResponse({
			data: data[0],
			message: 'File created',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: (error as DrizzleError).message || 'File not created',
		});
	}
};

export const getFileById = async (id: string) => {
	try {
		const data = await db
			.select()
			.from(FileTable)
			.where(eq(FileTable.id, id))
			.execute();

		if (!data[0]) {
			throw new Error('File not found');
		}

		return SuccessResponse({
			data: data[0],
			message: 'File retrieved',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: (error as DrizzleError).message || 'File not found',
		});
	}
};

export const getAllFiles = async () => {
	try {
		const data = await db.select().from(FileTable).execute();

		return SuccessResponse({
			data,
			message: 'Files retrieved',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: (error as DrizzleError).message || 'Files not found',
		});
	}
};

export const updateFileById = async (
	id: string,
	file: Partial<IFileInsert>,
) => {
	try {
		const data = await db
			.update(FileTable)
			.set(file)
			.where(eq(FileTable.id, id))
			.returning();

		if (!data[0]) {
			throw new Error('File not updated');
		}

		return SuccessResponse({
			data: data[0],
			message: 'File updated',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: (error as DrizzleError).message || 'File not updated',
		});
	}
};

export const deleteFileById = async (id: string) => {
	try {
		const data = await db
			.delete(FileTable)
			.where(eq(FileTable.id, id))
			.returning();

		if (!data[0]) {
			throw new Error('File not deleted');
		}

		return SuccessResponse({
			data: data[0],
			message: 'File deleted',
		});
	} catch (error) {
		throw ErrorResponse({
			error: error as DrizzleError,
			message: (error as DrizzleError).message || 'File not deleted',
		});
	}
};
