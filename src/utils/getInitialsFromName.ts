export const getInitialsFromName = (name: string) =>
	(
		(name.split(' ')[0]?.charAt(0) || '') +
		(name.split(' ')[1]?.charAt(0) || '')
	)?.toUpperCase();
