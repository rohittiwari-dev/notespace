'use client';

import { ChevronsUpDown, Plus } from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { IWorkSpace } from '@/db/schemas';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import WorkspaceSetupModal from '../workspace/workspace/workspace-setup-modal';
import { useState } from 'react';
import Avatar from './avatar';

const SwitchItemSkeleton = () => {
	return (
		<>
			<div className="bg-sidebar-primary animate-pulse text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
				<div className="size-8" />
			</div>
			<div className="grid flex-1 text-left gap-1 animate-pulse w-full text-sm leading-tight">
				<span className="truncate font-semibold w-32 h-3 bg-sidebar-accent" />
				<span className="truncate text-xs w-28 h-2.5 bg-sidebar-accent" />
			</div>
		</>
	);
};

function SpaceSwitcher({
	activeWorkspace,
	workspaces,
}: {
	workspaces: IWorkSpace[];
	activeWorkspace?: IWorkSpace;
}) {
	const [openAddWorkspace, setOpenAddWorkspace] = useState(false);
	const { isMobile } = useSidebar();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	// Simple workspace switching that prevents re-rendering loops
	const handleWorkspaceSwitch = (workspaceId: string) => {
		if (activeWorkspace?.id !== workspaceId) {
			setIsLoading(true);
			window.location.pathname = `/space/${workspaceId}`;
		}
	};

	return (
		<>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								disabled={!activeWorkspace}
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								{!activeWorkspace ? (
									<SwitchItemSkeleton />
								) : (
									<>
										<div className="bg-sidebar-primary cursor-pointer text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
											<Avatar
												shape="rounded"
												href={
													activeWorkspace?.logo ?? ''
												}
												alt={
													activeWorkspace?.name ?? ''
												}
												className="size-8"
												initial={
													activeWorkspace?.icon ?? ''
												}
												fallbackClassName="text-base"
											/>
										</div>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-semibold">
												{activeWorkspace?.name ?? ''}
											</span>
											<span className="truncate text-xs">
												{activeWorkspace?.description ??
													''}
											</span>
										</div>
										<ChevronsUpDown className="ml-auto" />
									</>
								)}
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
							align="start"
							side={isMobile ? 'bottom' : 'right'}
							sideOffset={4}
						>
							<DropdownMenuLabel className="text-muted-foreground text-xs">
								Workspaces
							</DropdownMenuLabel>
							{workspaces?.map((team, index) => (
								<DropdownMenuItem
									key={team.name}
									onClick={() =>
										handleWorkspaceSwitch(team.id)
									}
									className="gap-2 p-2 cursor-pointer"
									disabled={isLoading}
								>
									<div className="border-secondary-500/50 flex size-6 items-center justify-center rounded-sm border">
										<Avatar
											shape="rounded"
											href={team.logo ?? ''}
											alt={team.name}
											className="size-6"
											initial={team.icon}
											fallbackClassName="text-base"
										/>
									</div>
									{team.name}
									<DropdownMenuShortcut>
										⌘{index + 1}
									</DropdownMenuShortcut>
								</DropdownMenuItem>
							))}
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="gap-2 p-2 cursor-pointer hover:bg-accent/50 group"
								onClick={() => setOpenAddWorkspace(true)}
							>
								<div className="bg-background group-hover:bg-secondary-700 border-secondary-500/50 flex size-6 items-center justify-center rounded-md border">
									<Plus className="size-4" />
								</div>
								<div className=" group-hover:text-accent-foreground/70 text-muted-foreground font-medium">
									Add Workspace
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
			<WorkspaceSetupModal
				open={openAddWorkspace}
				onClose={() => setOpenAddWorkspace(false)}
			/>
		</>
	);
}

export default SpaceSwitcher;
