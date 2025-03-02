import { IS_PRODUCTION } from "@/utils/environment";
import { DrizzleError, TransactionRollbackError } from "drizzle-orm";
import { logger } from "@/utils/logger";

function shouldRedact<T extends Error>(error: T) {
	return (
		error instanceof DrizzleError ||
		error instanceof TransactionRollbackError
	);
}

export const redactError = <T extends Error | unknown>(error: T) => {
	if (!(error instanceof Error)) {
		return error;
	}
	logger.debug("[RedactError] Type of Error: ", error.constructor);
	if (shouldRedact(error) && IS_PRODUCTION) {
		logger.error("[RedactError] Error: ", JSON.stringify(error));
		return new Error("An error occurred while querying the database.");
	}
	return error;
};
