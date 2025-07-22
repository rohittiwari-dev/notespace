import { z } from 'zod';

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
			.regex(/^[a-z0-9]{24}$/i, { message: 'Invalid moduleId' })
			.safeParse(id).success
	);
}
