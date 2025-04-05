'use client';

import { SELECTED_SPACE_COOKIE_NAME } from '@/lib/constants';
import { useCallback } from 'react';

export const useClientCookies = () => {
	const getCookie = useCallback((name: string): string | undefined => {
		if (typeof document === 'undefined') return undefined;

		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			if (cookie.startsWith(`${name}=`)) {
				return decodeURIComponent(cookie.substring(name.length + 1));
			}
		}
		return undefined;
	}, []);

	const setCookie = useCallback(
		(
			name: string,
			value: string,
			days: number = 30,
			path: string = '/',
		) => {
			if (typeof document === 'undefined') return;

			const date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			const expires = `expires=${date.toUTCString()}`;
			document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=${path};SameSite=Lax`;
		},
		[],
	);

	const removeCookie = useCallback((name: string, path: string = '/') => {
		if (typeof document === 'undefined') return;

		document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`;
	}, []);

	const getSelectedWorkspaceId = useCallback(
		(defaultId: string = '') => {
			return getCookie(SELECTED_SPACE_COOKIE_NAME) || defaultId;
		},
		[getCookie],
	);

	const setSelectedWorkspaceId = useCallback(
		(workspaceId: string) => {
			setCookie(SELECTED_SPACE_COOKIE_NAME, workspaceId);
		},
		[setCookie],
	);

	return {
		getCookie,
		setCookie,
		removeCookie,
		getSelectedWorkspaceId,
		setSelectedWorkspaceId,
	};
};
