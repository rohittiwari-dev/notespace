import React from 'react';
import AppSidebar from '@/components/workspace/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import SpaceHeader from '@/components/workspace/space-header';
import { cookies } from 'next/headers';
import { SIDEBAR_COOKIE_NAME } from '@/lib/constants';
import { redirect } from 'next/navigation';
import { api } from '@/lib/trpc/server';
import { getLoggedInUser } from '@/lib/auth/actions';

const SpaceLayout = async ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ workspaceId: string }>;
}) => {
	const { workspaceId } = await params;
	const cookieStore = await cookies();
	const sidebarOpen = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value === 'true';
	const user = await getLoggedInUser();

	if (!user) {
		redirect('/login');
	}

	try {
		// Get all workspaces for the user
		const workspaces = await api.workspace.getWorkspaces({
			userId: user?.id ?? '',
		});

		// If no workspaces, redirect to space
		if (!workspaces?.length) {
			redirect('/space');
		}

		// Find the current workspace by ID
		const currentWorkspace = workspaces.find(
			(workspace) => workspace.id === workspaceId,
		);

		// If the workspace ID is invalid, redirect to space
		if (!currentWorkspace) {
			redirect('/space');
		}

		return (
			<SidebarProvider defaultOpen={sidebarOpen}>
				<AppSidebar
					user={user}
					currentWorkspace={currentWorkspace}
					workspaces={workspaces ?? []}
				/>
				<SidebarInset className="!bg-transparent">
					<SpaceHeader
						routePatterns={[
							'/space/[workspaceId]',
							'/space/[workspaceId]/test/test',
							'/space',
						]}
						workspace={currentWorkspace}
					/>
					<main className="flex flex-1 flex-col gap-4 p-4 pt-0">
						{children}
					</main>
				</SidebarInset>
			</SidebarProvider>
		);
	} catch (error) {
		redirect('/space');
	}
};

export default SpaceLayout;
