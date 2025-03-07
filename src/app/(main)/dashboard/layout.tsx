import React from 'react';
import AppSidebar from '@/components/shared/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import DashboardHeader from '@/components/shared/dashboard-header';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider className="relative">
			<div className="bg-accent-pink/70 absolute -top-30 right-1 -z-10 h-50 w-96 opacity-45 bg-blend-multiply blur-[100px] dark:opacity-30" />
			<div className="bg-accent-orange/70 absolute -top-30 right-80 -z-10 h-50 w-96 opacity-45 bg-blend-multiply blur-[100px] dark:opacity-30" />
			<div className="bg-accent-purple/70 absolute -bottom-30 left-1 -z-10 h-50 w-96 opacity-45 bg-blend-multiply blur-[100px] dark:opacity-30" />
			<AppSidebar />
			<SidebarInset className="bg-background/50">
				<DashboardHeader />
				<main className="flex flex-1 flex-col gap-4 p-4 pt-0">
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default DashboardLayout;
