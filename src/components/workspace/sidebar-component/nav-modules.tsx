'use client';

import {
	FolderIcon,
	MoreHorizontalIcon,
	PlusCircleIcon,
	Share2,
	Trash,
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
import Link from 'next/link';
import trpc from '@/lib/trpc/client';
import useAppStore from '@/store';
import Spinner from '@/components/app-ui/spinner';
import Color from 'color';

export function NavModules({
	items,
}: {
	items: {
		name: string;
		url: string;
		icon: React.JSX.Element | string;
		id: string;
		color: string | null;
		logo?: string | null;
	}[];
}) {
	const trpcUtils = trpc.useUtils();
	const { deleteModule } = useAppStore();
	const { isMobile } = useSidebar();
	const { mutate: softDeleteMutate, isPending: softIsPending } =
		trpc.modules.softDeleteWorkspace.useMutation({
			onSuccess: (input) => {
				deleteModule(input.id);
				trpcUtils.modules.getModules.invalidate();
			},
		});
	const { mutate: hardDeleteMutate, isPending: hardIsPending } =
		trpc.modules.hardDeleteWorkspace.useMutation({
			onSuccess: (input) => {
				deleteModule(input.id, 'hard');
				trpcUtils.modules.getModules.invalidate();
			},
		});

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
							<SidebarMenuButton
								asChild
								style={
									item?.color
										? ({
												['--hover-bg-color']: Color(
													item.color,
												)
													.alpha(0.3)
													.string(),
											} as React.CSSProperties)
										: undefined
								}
								className={
									item?.color
										? 'hover:bg-[var(--hover-bg-color)]'
										: ''
								}
							>
								<Link
									href={item.url}
									className="flex items-center dark:text-slate-200 !gap-2"
								>
									<span>{item.icon}</span>
									<span>{item.name}</span>
								</Link>
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
									<DropdownMenuItem className="cursor-pointer text-foreground/80 group hover:!text-foreground/80">
										<FolderIcon className="size-3 !text-inherit group-hover:text-foreground/80" />
										<span className="text-xs">Open</span>
									</DropdownMenuItem>
									<DropdownMenuItem className="cursor-pointer text-foreground/80 group hover:!text-foreground/80">
										<Share2 className="size-3 !text-inherit group-hover:text-foreground/80" />
										<span className="text-xs">Share</span>
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() =>
											hardDeleteMutate(item.id)
										}
										disabled={hardIsPending}
										className="cursor-pointer text-foreground/80 group hover:!text-red-400"
									>
										{hardIsPending ? (
											<Spinner className="size-3 !text-inherit group-hover:text-red-400" />
										) : (
											<Trash className="size-3 !text-inherit group-hover:text-red-400" />
										)}
										<span className="text-xs mt-0.5">
											Delete
										</span>
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() =>
											softDeleteMutate(item.id)
										}
										disabled={softIsPending}
										className="cursor-pointer text-foreground/80 group hover:!text-red-400"
									>
										{softIsPending ? (
											<Spinner className="size-3 !text-inherit group-hover:text-red-400" />
										) : (
											<Trash className="size-3 !text-inherit group-hover:text-red-400" />
										)}
										<span className="text-xs mt-0.5">
											Move To Trash
										</span>
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
