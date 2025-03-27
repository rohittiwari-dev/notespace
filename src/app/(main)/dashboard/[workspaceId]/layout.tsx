import React from 'react';
import AppSidebar from '@/components/dashboard/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import DashboardHeader from '@/components/dashboard/dashboard-header';
import { cookies } from 'next/headers';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const cookieStore = await cookies();
	const sidebarOpen = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value === 'true';

	return (
		<SidebarProvider defaultOpen={sidebarOpen}>
			<AppSidebar />
			<SidebarInset className="!bg-transparent">
				<DashboardHeader />
				<main className="flex flex-1 flex-col gap-4 p-4 pt-0">
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default DashboardLayout;
