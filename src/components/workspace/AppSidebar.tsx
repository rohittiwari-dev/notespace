'use client';

import * as React from 'react';
import {
	ClipboardListIcon,
	DatabaseIcon,
	FileIcon,
	InboxIcon,
	LayoutDashboardIcon,
	SettingsIcon,
	SquareStack,
	WorkflowIcon,
} from 'lucide-react';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import UserButton from '../app-ui/user-button';
import { NavMain } from './sidebar-component/nav-main';

import { NavSecondary } from './sidebar-component/nav-secondary';
import SpaceSwitcher from '../app-ui/space-switcher';

import { IWorkSpace } from '@/db/schemas';
import { User } from 'better-auth';
import { NavModules } from './sidebar-component/nav-modules';
import useAppStore from '@/store';
import { Trash } from 'lucide-react';

const getSidebarData = ({
	currentWorkspace,
}: {
	isMobile?: boolean;
	user?: User;
	workspaces?: IWorkSpace[];
	currentWorkspace?: IWorkSpace;
} = {}) => ({
	navMain: [
		{
			title: 'Dashboard',
			url: '/space',
			icon: LayoutDashboardIcon,
		},
		{
			title: 'Inbox',
			url: '#',
			icon: InboxIcon,
		},
		{
			title: 'Task Management',
			url: '#',
			icon: SquareStack,
		},
		{
			title: 'Workflows',
			url: '#',
			icon: WorkflowIcon,
		},
	],
	navSecondary: [
		{
			title: 'Settings',
			url: `/space/${currentWorkspace?.id}/settings`,
			icon: SettingsIcon,
		},
		{
			title: 'Trash',
			url: '#',
			icon: Trash,
		},
	],
	documents: [
		{
			name: 'Data Library',
			url: '#',
			icon: DatabaseIcon,
		},
		{
			name: 'Reports',
			url: '#',
			icon: ClipboardListIcon,
		},
		{
			name: 'Word Assistant',
			url: '#',
			icon: FileIcon,
		},
	],
});

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user, workspaces, workspace } = useAppStore();
	const { isMobile } = useSidebar();
	const data = getSidebarData({
		isMobile,
		user: user ?? undefined,
		workspaces,
		currentWorkspace: workspace ?? undefined,
	});

	return (
		<Sidebar
			collapsible="icon"
			variant="sidebar"
			className="border-r-accent/40 shadow select-none"
			{...props}
		>
			<SidebarHeader>
				<SpaceSwitcher
					workspaces={workspaces ?? []}
					dropdownContentAlign={isMobile ? 'bottom' : 'right'}
					activeWorkspace={workspace}
				/>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavModules items={data.documents} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					{user && (
						<SidebarMenuItem>
							<UserButton
								dropdownContentAlign={
									isMobile ? 'bottom' : 'right'
								}
								name={user.name ?? ''}
								email={user.email ?? ''}
								avatar={user.image ?? ''}
							/>
						</SidebarMenuItem>
					)}
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}

export default AppSidebar;
