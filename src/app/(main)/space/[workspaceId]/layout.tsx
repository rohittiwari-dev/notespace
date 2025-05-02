import React from 'react';
import AppSidebar from '@/components/workspace/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import SpaceHeader from '@/components/workspace/space-header';
import { SIDEBAR_COOKIE_NAME } from '@/lib/constants';
import { cookies } from 'next/headers';
import trpc from '@/lib/trpc/server';

const SpaceLayout = async ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ workspaceId: string }>;
}) => {
	const cookieStore = await cookies();
	trpc.workspace.getWorkspace.prefetch({
		workspaceId: (await params).workspaceId,
	});
	const sidebarOpen = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value === 'true';
	return (
		<SidebarProvider defaultOpen={sidebarOpen} className="w-screen h-svh">
			<AppSidebar />
			<SidebarInset className="!bg-transparent  overflow-y-auto">
				<SpaceHeader
					breadcrumbEnabled
					breadcrumbsActivePaths={[
						'/space/[workspaceId]',
						'/space/[workspaceId]/settings',
						'/space',
					]}
				/>
				<main className="flex flex-col flex-1 gap-4 h-fit p-4 pt-0 pb-0">
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default SpaceLayout;
