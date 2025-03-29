'use server';

import { cookies } from 'next/headers';
import { SELECTED_SPACE_COOKIE_NAME } from '@/lib/constants';
import { redirect } from 'next/navigation';

export async function setWorkspaceCookie(workspaceId: string) {
	// Set the cookie using the correct API
	(
		await // Set the cookie using the correct API
		cookies()
	).set({
		name: SELECTED_SPACE_COOKIE_NAME,
		value: workspaceId,
		maxAge: 31536000, // 1 year
		path: '/',
	});

	// Return true to indicate success
	return true;
}

export async function switchWorkspace(workspaceId: string) {
	// Set the cookie
	await setWorkspaceCookie(workspaceId);

	// Redirect to the new workspace
	redirect(`/space/${workspaceId}`);
}
