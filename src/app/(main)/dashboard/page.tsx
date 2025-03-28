import { getLoggedInUser } from '@/lib/auth/actions';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { SELECTED_SPACE_COOKIE_NAME } from '@/lib/constants';
import { api } from '@/lib/trpc/server';
import SetupWorkspace from '@/components/dashboard/workspace/setup-workspace';

const DashboardPage = async () => {
	const cookieStore = await cookies();
	const user = await getLoggedInUser();
	const workspaces = await api.workspace.getWorkspaces({
		userId: user?.id as string,
	});

	if (workspaces?.length) {
		const findRequiredWorkspace =
			workspaces.find(
				(space) =>
					space.id ===
					cookieStore.get(SELECTED_SPACE_COOKIE_NAME)?.value,
			) ?? workspaces[0];
		redirect(`/dashboard/${findRequiredWorkspace.id}`);
	}

	return (
		<main className="w-full h-full flex justify-center items-center">
			<SetupWorkspace />
		</main>
	);
};

export default DashboardPage;
