import { getLoggedInUser } from '@/server/actions/auth.actions';

import { redirect } from 'next/navigation';
import React from 'react';

import { api } from '@/lib/trpc/server';
import SetupWorkspace from '@/components/workspace/setup-workspace';

const SpacePage = async () => {
	const user = await getLoggedInUser();

	// Get workspaces for the user
	const workspaces = await api.workspace.getWorkspaces({
		userId: user?.id as string,
	});

	if (workspaces?.length) {
		// Simply redirect to the first workspace
		// This simplifies the logic and prevents circular dependencies
		redirect(`/space/${workspaces[0].id}`);
	}

	// If no workspaces, show the workspace setup component
	return (
		<main className="w-full h-full flex justify-center items-center">
			<SetupWorkspace />
		</main>
	);
};

export default SpacePage;
