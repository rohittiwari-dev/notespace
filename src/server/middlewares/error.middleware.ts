import { createMiddleware } from "../trpc";
import { redactError } from "@/utils/radactError";

export const captureErrorsMiddleware = createMiddleware(async ({ next }) => {
	const result = await next();
	if (result && !result.ok) {
		const cause = result.error.cause;
		if (!cause) {
			return result;
		}
		// const { captureException } = await import("@sentry/nextjs");
		// captureException(cause);
		throw redactError(cause);
	}
	return result;
});

export default captureErrorsMiddleware;
