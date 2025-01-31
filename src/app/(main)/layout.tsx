import { AppSidebar } from "@/components/app-ui/sidebar-layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar-layout";
import Image from "next/image";
import backgroundLeft from "@/assets/backgrounds/docs-left.png";
import backgroundRight from "@/assets/backgrounds/docs-right.png";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="bg-secondary-950 relative z-0 h-full w-full">
			<div className="container-main left-[ min(calc(600px+15vw),calc(600px-2vw))] fixed top-0 -z-10 mx-auto w-full animate-pulse opacity-45 blur-[100px] !duration-[4s] dark:opacity-70">
				<div className="bg-site-main-clip h-[600px] w-[600px] bg-pink-700/40 bg-blend-luminosity" />
			</div>
			<Image
				src={backgroundLeft}
				data-loaded="true"
				className="rounded-large fixed top-0 -left-10 -z-10 h-auto w-[90vw] animate-pulse opacity-0 shadow-none shadow-black/5 transition-transform !delay-500 !duration-[4s] data-[loaded=true]:opacity-50 motion-reduce:transition-none dark:data-[loaded=true]:opacity-100"
				alt="docs right background"
			/>
			<Image
				src={backgroundRight}
				data-loaded="true"
				className="rounded-large fixed -right-50 -bottom-20 -z-10 h-auto w-[80vw] animate-pulse opacity-0 shadow-none shadow-black/5 transition-transform !duration-[4s] data-[loaded=true]:opacity-50 motion-reduce:transition-none dark:data-[loaded=true]:opacity-100"
				alt="docs left background"
			/>
			<div className="bg-background/40 relative z-10 flex h-full w-full flex-col overflow-y-auto bg-blend-screen backdrop-blur-md">
				<SidebarProvider>
					<AppSidebar />
					<SidebarInset>{children}</SidebarInset>
				</SidebarProvider>
			</div>
		</main>
	);
}
