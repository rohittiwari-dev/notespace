'use client';

import * as React from 'react';
import {
	CameraIcon,
	ClipboardListIcon,
	DatabaseIcon,
	FileCodeIcon,
	FileIcon,
	FileTextIcon,
	HelpCircleIcon,
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
} from '@/components/ui/sidebar';
import UserView from '../app-ui/user-view';
import { NavMain } from './sidebar-component/nav-main';

import { NavSecondary } from './sidebar-component/nav-secondary';
import SpaceSwitcher from '../app-ui/space-switcher';

import { IWorkSpace } from '@/db/schemas';
import { User } from 'better-auth';
import { NavModules } from './sidebar-component/nav-modules';

const data = {
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
	navClouds: [
		{
			title: 'Capture',
			icon: CameraIcon,
			isActive: true,
			url: '#',
			items: [
				{
					title: 'Active Proposals',
					url: '#',
				},
				{
					title: 'Archived',
					url: '#',
				},
			],
		},
		{
			title: 'Proposal',
			icon: FileTextIcon,
			url: '#',
			items: [
				{
					title: 'Active Proposals',
					url: '#',
				},
				{
					title: 'Archived',
					url: '#',
				},
			],
		},
		{
			title: 'Prompts',
			icon: FileCodeIcon,
			url: '#',
			items: [
				{
					title: 'Active Proposals',
					url: '#',
				},
				{
					title: 'Archived',
					url: '#',
				},
			],
		},
	],
	navSecondary: [
		{
			title: 'Settings',
			url: '#',
			icon: SettingsIcon,
		},
		{
			title: 'Get Help',
			url: '#',
			icon: HelpCircleIcon,
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
};

function AppSidebar({
	currentWorkspace,
	workspaces,
	user,
	...props
}: React.ComponentProps<typeof Sidebar> & {
	currentWorkspace: IWorkSpace;
	workspaces: IWorkSpace[];
	user: User;
}) {
	return (
		<Sidebar
			collapsible="icon"
			variant="sidebar"
			className="border-r-accent/40 select-none"
			{...props}
		>
			<SidebarHeader>
				<SpaceSwitcher
					workspaces={workspaces ?? []}
					activeWorkspace={currentWorkspace}
				/>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavModules items={data.documents} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<UserView
					name={user.name ?? ''}
					email={user.email ?? ''}
					avatar={user.image ?? ''}
				/>
			</SidebarFooter>
		</Sidebar>
	);
}

export default AppSidebar;
