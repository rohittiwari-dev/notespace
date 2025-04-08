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
		result.workspaceId = urlSegments[1];
	}
	if (urlSegments?.length > 2) {
		result.moduleId = urlSegments[2];
	}
	if (urlSegments?.length > 3) {
		result.fileId = urlSegments[3];
	}
	return result;
};
