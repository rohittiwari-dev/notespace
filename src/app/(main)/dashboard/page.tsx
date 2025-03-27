import { getLoggedInUser } from '@/lib/auth/actions';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { SELECTED_SPACE_COOKIE_NAME } from '@/lib/local.data';
import { api } from '@/lib/trpc/server';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ShineBorder } from '@/components/primitives/shine-border';

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
			<Card className="my-auto min-w-[min(400px,90%)] scale-90 rounded-xl relative overflow-hidden border-none shadow-none bg-transparent">
				<ShineBorder className="" />
				<CardHeader>
					<CardTitle>Dashboard</CardTitle>
				</CardHeader>
			</Card>
		</main>
	);
};

export default DashboardPage;
