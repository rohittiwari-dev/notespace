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
} from '@/components/ui/sidebar';
import { IWorkSpace } from '@/db/schemas';
import WorkspaceSetupModal from '../workspace/workspace-setup-modal';
import { useEffect, useState } from 'react';
import Avatar from './avatar';
import Link from 'next/link';

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
	dropdownContentAlign = 'bottom',
}: {
	workspaces: IWorkSpace[];
	activeWorkspace?: IWorkSpace | null;
	dropdownContentAlign?: 'bottom' | 'right' | 'top' | 'left' | undefined;
}) {
	const [mounted, setMounted] = useState(false);
	const [openAddWorkspace, setOpenAddWorkspace] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		mounted && (
			<>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									disabled={!activeWorkspace}
									size="lg"
									className="data-[state=open]:bg-sidebar-accent cursor-pointer data-[state=open]:text-sidebar-accent-foreground"
								>
									{!activeWorkspace ? (
										<SwitchItemSkeleton />
									) : (
										<>
											<div className="bg-sidebar-primary cursor-pointer text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
												<Avatar
													shape="rounded"
													href={
														activeWorkspace?.logo ??
														''
													}
													alt={
														activeWorkspace?.name ??
														''
													}
													className="size-8"
													initial={
														activeWorkspace?.icon ??
														''
													}
													fallbackClassName="text-base"
												/>
											</div>
											<div className="grid flex-1 text-left text-sm leading-tight">
												<span className="truncate font-semibold">
													{activeWorkspace?.name ??
														''}
												</span>
												<span className="truncate text-xs">
													✨Free
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
								side={dropdownContentAlign}
								sideOffset={4}
							>
								<DropdownMenuLabel className="text-muted-foreground text-xs">
									Workspaces
								</DropdownMenuLabel>
								{workspaces?.map((team, index) => (
									<DropdownMenuItem
										key={team.name}
										className="gap-2 p-2 hover:bg-accent/70 cursor-pointer"
										disabled={
											activeWorkspace?.id === team.id ||
											false
										}
										asChild
									>
										<Link href={`/space/${team.id}`}>
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
										</Link>
									</DropdownMenuItem>
								))}
								<DropdownMenuSeparator />
								<DropdownMenuItem
									className="gap-2 p-2 cursor-pointer hover:bg-accent/50 group"
									onClick={() => setOpenAddWorkspace(true)}
								>
									<div className="bg-background group-hover:bg-accent/50 dark:group-hover:bg-secondary-700 dark:border-secondary-500/50 flex size-6 items-center justify-center rounded-md border">
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
		)
	);
}

export default SpaceSwitcher;
