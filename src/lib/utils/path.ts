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
		result.workspaceId = z.string().cuid2().safeParse(urlSegments[1])
			.success
			? urlSegments[1]
			: undefined;
	}
	if (urlSegments?.length > 2) {
		result.moduleId = z.string().cuid2().safeParse(urlSegments[2]).success
			? urlSegments[2]
			: undefined;
	}
	if (urlSegments?.length > 3) {
		result.fileId = z.string().cuid2().safeParse(urlSegments[3]).success
			? urlSegments[3]
			: undefined;
	}
	return result;
};
