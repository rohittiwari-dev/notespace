import { z } from 'zod';

/**
 * Converts Next.js path pattern to regex for matching
 */
export const patternToRegex = (p: string): RegExp => {
	const r = p
		.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
		.replace(/\\\[\\\[\\\.\\\.\\\.(.*?)\\\]\\\]/g, '(?:\\/.*)?')
		.replace(/\\\[\\\.\\\.\\\.(.*?)\\\]/g, '\\/.*)')
		.replace(/\\\[(.*?)\\\]/g, '([^/]+)');
	return new RegExp(`^${r}$`);
};

/**
 * Checks if a path matches any provided route patterns
 */
export const matchesRoutePattern = (
	path: string,
	currentPath: string,
	patterns?: string[],
): boolean =>
	path === currentPath ||
	!patterns?.length ||
	patterns.some((p) => patternToRegex(p).test(path));

export const getUrlIds = (
	pathname: string,
): {
	workspaceId: undefined | string;
	moduleId: undefined | string;
	fileId: undefined | string;
} => {
	const result: {
		workspaceId: undefined | string;
		moduleId: undefined | string;
		fileId: undefined | string;
	} = {
		workspaceId: undefined,
		moduleId: undefined,
		fileId: undefined,
	};
	const urlSegments = pathname.split('/').filter(Boolean);
	if (urlSegments?.length > 1) {
		result.workspaceId = isCuid2(urlSegments[1])
			? urlSegments[1]
			: undefined;
	}
	if (urlSegments?.length > 2) {
		result.moduleId = isCuid2(urlSegments[2]) ? urlSegments[2] : undefined;
	}
	if (urlSegments?.length > 3) {
		result.fileId = isCuid2(urlSegments[3]) ? urlSegments[3] : undefined;
	}
	return result;
};

export function isCuid2(
	id: string,
	{
		minLength = 24,
		maxLength = 24,
	}: { minLength?: number; maxLength?: number } = {},
): boolean {
	const length = id?.length;
	const regex = /^[a-z0-9]{24}$/i; // CUID2: starts with a letter, followed by alphanumerics
	return (
		typeof id === 'string' &&
		length >= minLength &&
		length <= maxLength &&
		regex.test(id) &&
		z
			.string()
			.regex(/^[a-z0-9]{24}$/i, { error: 'Invalid moduleId' })
			.safeParse(id).success
	);
}
