'use client';

import {
	FolderIcon,
	MoreHorizontalIcon,
	PlusCircleIcon,
	ShareIcon,
} from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import CreateModuleModal from '../create-module-modal';

export function NavModules({
	items,
}: {
	items: {
		name: string;
		url: string;
		icon: React.JSX.Element | string;
	}[];
}) {
	const { isMobile } = useSidebar();

	return (
		<>
			<SidebarGroup className="group-data-[collapsible=icon]:hidden">
				<SidebarGroupLabel className="flex items-center justify-between mr-0 pr-0">
					<span>Modules</span>
					<CreateModuleModal>
						<SidebarMenuButton
							tooltip="Quick Create"
							size="sm"
							className="cursor-pointer max-w-min m-0"
						>
							<PlusCircleIcon />
						</SidebarMenuButton>
					</CreateModuleModal>
				</SidebarGroupLabel>

				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.name}>
							<SidebarMenuButton asChild>
								<a
									href={item.url}
									className="flex items-center dark:text-slate-200 !gap-2"
								>
									<span>{item.icon}</span>
									<span>{item.name}</span>
								</a>
							</SidebarMenuButton>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuAction
										showOnHover
										className="rounded-sm cursor-pointer focus-visible:!ring-transparent rotate-90 data-[state=open]:bg-accent"
									>
										<MoreHorizontalIcon />
										<span className="sr-only">More</span>
									</SidebarMenuAction>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className=" rounded-lg"
									side={isMobile ? 'bottom' : 'right'}
									align={isMobile ? 'end' : 'start'}
								>
									<DropdownMenuItem className="cursor-pointer ">
										<FolderIcon className="size-3" />
										<span className="text-xs">Open</span>
									</DropdownMenuItem>
									<DropdownMenuItem className="cursor-pointer ">
										<ShareIcon className="size-3" />
										<span className="text-xs">Share</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroup>
		</>
	);
}
