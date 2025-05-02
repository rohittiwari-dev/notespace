'use client';
import * as React from 'react';
import {
	Dot,
	Home,
	InboxIcon,
	SettingsIcon,
	SquareStack,
	Trash2,
	WorkflowIcon,
} from 'lucide-react';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import UserButton from '../app-ui/user-button';
import { NavMain } from './sidebar-component/nav-main';
import { NavSecondary } from './sidebar-component/nav-secondary';
import SpaceSwitcher from '../app-ui/space-switcher';
import { IModule, IWorkSpace } from '@/db/schemas';
import { User } from 'better-auth';
import { NavModules } from './sidebar-component/nav-modules';
import useAppStore from '@/store';
import { cn } from '@/lib/utils';
import {
	getColorFromClass,
	getRandomTailwindText400ShadeColor,
	oklchToHex,
} from '@/lib/utils/colors';
import CustomSuspense from '../app-ui/CustomSuspense';
import { UserButtonSidebarSkeleton } from '../skeletons/workspace/sidebar';

const getSidebarData = ({
	currentWorkspace,
	modules = [],
}: {
	isMobile?: boolean;
	user?: User;
	workspaces?: IWorkSpace[];
	currentWorkspace?: IWorkSpace;
	modules?: IModule[];
	theme?: string;
} = {}) => ({
	navMain: [
		{
			id: 1,
			title: 'Home',
			url: `/space/${currentWorkspace?.id}`,
			icon: Home,
		},
		{
			id: 2,
			title: 'Inbox',
			url: '#',
			icon: InboxIcon,
		},
		{
			id: 3,
			title: 'Task Management',
			url: '#',
			icon: SquareStack,
		},
		{
			id: 4,
			title: 'Workflows',
			url: '#',
			icon: WorkflowIcon,
		},
	],
	navSecondary: [
		{
			id: 1,
			title: 'Settings',
			url: `/space/${currentWorkspace?.id}/settings`,
			icon: SettingsIcon,
		},
		{
			// ID is Used to determine if the module is a trash module in further logic for opening the trash in NavSecondary component
			// Do change id there as well if it is changed here
			id: 2,
			title: 'Trash',
			url: '#',
			icon: Trash2,
		},
	],
	modules: modules.map((val) => ({
		name: val.name,
		url: `/space/${currentWorkspace?.id}/${val.id}`,
		id: val.id,
		color: val.color,
		logo: val.logo,
		icon: val.icon || (
			<Dot
				className={cn(`size-10 -mx-3 `)}
				color={
					val?.color ||
					oklchToHex(
						getColorFromClass(getRandomTailwindText400ShadeColor()),
					)
				}
			/>
		),
	})),
});

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user, workspaces, workspace, modules } = useAppStore();
	const { isMobile } = useSidebar();
	const data = getSidebarData({
		isMobile,
		user: user ?? undefined,
		workspaces,
		currentWorkspace: workspace ?? undefined,
		modules: modules ?? [],
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
				<NavModules items={data.modules} />
				<NavSecondary
					items={data.navSecondary}
					className="mt-auto"
					dropdownContentAlign={isMobile ? 'bottom' : 'right'}
				/>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<CustomSuspense
							data={user ?? undefined}
							checkValidForData={true}
							fallback={
								<SidebarMenuButton
									size="lg"
									className={cn(
										'data-[state=open]:bg-sidebar-accent px-2 w-full select-none cursor-pointer data-[state=open]:text-sidebar-accent-foreground',
									)}
								>
									<UserButtonSidebarSkeleton />
								</SidebarMenuButton>
							}
							timeout={200}
						>
							<UserButton
								dropdownContentAlign={
									isMobile ? 'bottom' : 'right'
								}
								name={user?.name ?? ''}
								email={user?.email ?? ''}
								avatar={user?.image ?? ''}
							/>
						</CustomSuspense>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}

export default AppSidebar;
