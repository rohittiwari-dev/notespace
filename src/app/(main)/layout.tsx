import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar-layout";
import React from "react";
import { AppSidebar } from "@/components/app-ui/sidebar-layout/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="bg-background relative z-0 h-full w-full overflow-hidden">
			<div className="absolute -top-30 right-1 -z-10 h-50 w-96 bg-pink-800 opacity-25 bg-blend-multiply blur-[100px] dark:opacity-45" />
			<div className="absolute -top-30 right-80 -z-10 h-50 w-96 bg-orange-700 opacity-25 bg-blend-multiply blur-[100px] dark:opacity-45" />
			<div className="absolute -bottom-30 left-1 -z-10 h-50 w-96 bg-purple-700 opacity-25 bg-blend-multiply blur-[100px] dark:opacity-45" />
			<div className="bg-background/30 z-50 h-full w-full overflow-y-auto backdrop-blur-3xl">
				<SidebarProvider>
					<AppSidebar />
					<SidebarInset>{children}</SidebarInset>
				</SidebarProvider>
			</div>
		</main>
	);
}
