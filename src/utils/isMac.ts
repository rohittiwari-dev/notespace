export const isMac =
	typeof window !== 'undefined' ? navigator.userAgent.includes('Mac') : false;
