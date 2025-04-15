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
import Image from 'next/image';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

const NavModuleItem = ({
	item,
}: {
	item: {
		name: string;
		url: string;
		icon: React.JSX.Element | string;
		id: string;
		color: string | null;
		logo?: string | null;
	};
}) => {
	const trpcUtils = trpc.useUtils();
	const { deleteModule } = useAppStore();
	const { isMobile } = useSidebar();
	const { mutateAsync: hardDeleteMutate, isPending: hardIsPending } =
		trpc.modules.hardDeleteWorkspace.useMutation({
			onSuccess: async (input) => {
				deleteModule(input.id, 'hard');
				await trpcUtils.modules.getModules.invalidate();
			},
		});

	// Replace the problematic useEffect with a simpler approach
	const { mutateAsync: softDeleteMutate, isPending: softIsPending } =
		trpc.modules.softDeleteWorkspace.useMutation({
			onSuccess: async (input) => {
				deleteModule(input.id);
				await trpcUtils.modules.getModules.invalidate();
			},
		});

	// Helper function to handle hard delete with toast
	const handleHardDelete = (id: string) => {
		toast.promise(hardDeleteMutate(id), {
			loading: 'Deleting Module...',
			success: 'Module Deleted',
			error: 'Failed to delete module',
		});
	};

	// Helper function to handle soft delete with toast
	const handleSoftDelete = (id: string) => {
		toast.promise(softDeleteMutate(id), {
			loading: 'Moving to trash...',
			success: 'Module moved to trash',
			error: 'Failed to move module to trash',
		});
	};
	return (
		<motion.div
			className="max-h-74"
			{...{
				initial: {
					opacity: 0,
					x: -20,
					scale: 0.95,
				},
				animate: { opacity: 1, x: 0, scale: 1 },
				transition: {
					duration: 0.3,
					ease: 'easeOut',
					staggerChildren: 0.1,
				},
			}}
		>
			<SidebarMenuItem>
				<SidebarMenuButton
					asChild
					style={
						item?.color
							? ({
									['--hover-bg-color']: Color(item.color)
										.alpha(0.3)
										.string(),
								} as React.CSSProperties)
							: undefined
					}
					className={
						item?.color ? 'hover:bg-[var(--hover-bg-color)]' : ''
					}
				>
					<Link
						href={item.url}
						className="flex items-center dark:text-slate-200 !gap-2"
					>
						<span className="aspect-1 flex justify-center items-center min-w-5">
							{item.logo ? (
								<Image
									src={item.logo}
									alt={`module${item.name}${item.id}`}
									width={100}
									height={100}
									className="size-4 aspect-1 object-cover object-center"
								/>
							) : (
								item.icon
							)}
						</span>
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
							onClick={() => handleHardDelete(item.id)}
							disabled={hardIsPending}
							className="cursor-pointer text-foreground/80 group hover:!text-red-400"
						>
							{hardIsPending ? (
								<Spinner className="size-3 !text-inherit group-hover:text-red-400" />
							) : (
								<Trash className="size-3 !text-inherit group-hover:text-red-400" />
							)}
							<span className="text-xs mt-0.5">Delete</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => handleSoftDelete(item.id)}
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
		</motion.div>
	);
};

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

				<SidebarMenu className="max-h-74 overflow-hidden overflow-y-auto">
					{items.length <= 0 && (
						<div className="flex border-2 mx-auto p-3 rounded-md mt-2 border-primary-700 w-[95%] border-dashed flex-col items-center text-center justify-center h-full gap-4">
							<p className="text-sm text-foreground/80">
								There is no modules found in your workspace
							</p>
							<p className="text-sm text-foreground/80">
								You can create a new module
							</p>
							<CreateModuleModal>
								<Button
									size="sm"
									variant="outline"
									className="border-2 text-xs text-foreground/80 rounded-md bg-secondary-800 hover:bg-accent border-primary-700 border-dashed"
								>
									Create
								</Button>
							</CreateModuleModal>
						</div>
					)}
					{items.map((item, idx) => (
						<NavModuleItem key={item.id + idx} item={item} />
					))}
				</SidebarMenu>
			</SidebarGroup>
		</>
	);
}
