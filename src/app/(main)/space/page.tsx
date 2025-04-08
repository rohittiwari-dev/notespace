import { getLoggedInUser } from '@/server/actions/auth.actions';
import { redirect } from 'next/navigation';
import React from 'react';
import trpc from '@/lib/trpc/server';
import SetupWorkspace from '@/components/workspace/setup-workspace';
import { cookies } from 'next/headers';
import { SELECTED_SPACE_COOKIE_NAME } from '@/lib/constants';

const SpacePage = async () => {
	const user = await getLoggedInUser();
	const cookieStore = await cookies();
	const workspaceId = cookieStore.get(SELECTED_SPACE_COOKIE_NAME)?.value;

	// Get workspaces for the user
	const workspaces = await trpc.workspace.getWorkspaces({
		userId: user?.id as string,
	});
	const workspace = workspaces.find(
		(workspace) => workspace.id === workspaceId,
	);

	if (workspaces?.length) {
		// Simply redirect to the first workspace
		// This simplifies the logic and prevents circular dependencies
		redirect(`/space/${workspace?.id || workspaces[0].id}`);
	}

	// If no workspaces, show the workspace setup component
	return (
		<main className="w-full h-full flex justify-center items-center">
			<SetupWorkspace />
		</main>
	);
};

export default SpacePage;
