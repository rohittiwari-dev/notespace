import { IS_DEV, logger } from '@/lib/utils';
import { DrizzleError } from 'drizzle-orm';

/**
 * Success Response
 * @param rest
 * @returns
 */
function SuccessResponse<T>({
	data,
	...rest
}: {
	message?: string;
	data: T;
	[key: string]: any;
}) {
	return {
		error: null,
		success: true,
		message: rest['message'],
		data,
		...rest,
	};
}

/**
 * Error Response
 * @param stack
 * @param error
 * @param message
 * @param rest
 * @returns
 */
function ErrorResponse({
	error,
	stack,
	message,
	...rest
}: {
	error: DrizzleError | Error | unknown;
	stack?: string;
	message?: string;
	[key: string]: any;
}) {
	if (IS_DEV) {
		logger.error(
			`Drizzle Error : ${(error as any).message} : ${(error as DrizzleError).name}`,
		);
	}
	return {
		...(error as Error),
		...rest,
		stack: IS_DEV ? stack || (error as Error).stack : undefined,
		message: message || (error as Error).message,
		success: false,
		data: null,
	};
}
export { SuccessResponse, ErrorResponse };
