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

import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

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
	const pathname = usePathname();
	const trpcUtils = trpc.useUtils();
	const { deleteModule } = useAppStore();
	const { isMobile } = useSidebar();
	const { mutateAsync: hardDeleteMutate, isPending: hardIsPending } =
		trpc.modules.hardDeleteWorkspace.useMutation({
			onSuccess: async (input) => {
				deleteModule(input.id, 'hard');
				await trpcUtils.modules.getModules.invalidate();
				await trpcUtils.modules.getTrashItems.invalidate();
			},
		});

	// Replace the problematic useEffect with a simpler approach
	const { mutateAsync: softDeleteMutate, isPending: softIsPending } =
		trpc.modules.softDeleteWorkspace.useMutation({
			onSuccess: async (input) => {
				deleteModule(input.id);
				await trpcUtils.modules.getModules.invalidate();
				await trpcUtils.modules.getTrashItems.invalidate();
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
		<SidebarMenuItem className="flex justify-between items-center">
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
				className={cn(
					'px-1.5 !py-0',
					pathname?.includes(item.id) && 'bg-primary/40',
					item?.color ? 'hover:bg-[var(--hover-bg-color)]' : '',
				)}
			>
				<Link
					href={item.url}
					className="flex items-center !gap-2 dark:text-slate-200"
				>
					<span className="flex justify-center items-center min-w-5 aspect-1">
						{item.logo ? (
							<Image
								src={item.logo}
								alt={`module${item.name}${item.id}`}
								width={100}
								height={100}
								className="size-4 object-center object-cover aspect-1"
							/>
						) : (
							item.icon
						)}
					</span>
					<span>{item.name}</span>
				</Link>
			</SidebarMenuButton>
			<DropdownMenu>
				<DropdownMenuTrigger asChild className="!m-0 !p-0">
					<SidebarMenuAction
						showOnHover
						className="data-[state=open]:bg-accent !m-0 !p-0 rounded-sm focus-visible:!ring-transparent rotate-90 cursor-pointer"
					>
						<MoreHorizontalIcon />
						<span className="sr-only">More</span>
					</SidebarMenuAction>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="rounded-lg"
					side={isMobile ? 'bottom' : 'right'}
					align={isMobile ? 'end' : 'start'}
				>
					<DropdownMenuItem className="group text-foreground/80 hover:!text-foreground/80 cursor-pointer">
						<FolderIcon className="size-3 !text-inherit group-hover:text-foreground/80" />
						<span className="text-xs">Open</span>
					</DropdownMenuItem>
					<DropdownMenuItem className="group text-foreground/80 hover:!text-foreground/80 cursor-pointer">
						<Share2 className="size-3 !text-inherit group-hover:text-foreground/80" />
						<span className="text-xs">Share</span>
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => handleHardDelete(item.id)}
						disabled={hardIsPending}
						className="group text-foreground/80 hover:!text-red-400 cursor-pointer"
					>
						{hardIsPending ? (
							<Spinner className="size-3 !text-inherit group-hover:text-red-400" />
						) : (
							<Trash className="size-3 !text-inherit group-hover:text-red-400" />
						)}
						<span className="mt-0.5 text-xs">Delete</span>
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => handleSoftDelete(item.id)}
						disabled={softIsPending}
						className="group text-foreground/80 hover:!text-red-400 cursor-pointer"
					>
						{softIsPending ? (
							<Spinner className="size-3 !text-inherit group-hover:text-red-400" />
						) : (
							<Trash className="size-3 !text-inherit group-hover:text-red-400" />
						)}
						<span className="mt-0.5 text-xs">Move To Trash</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</SidebarMenuItem>
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
				<SidebarGroupLabel className="flex justify-between items-center mr-0 pr-0">
					<span>Modules</span>
					<CreateModuleModal>
						<SidebarMenuButton
							tooltip="Quick Create"
							size="sm"
							className="m-0 max-w-min cursor-pointer"
						>
							<PlusCircleIcon />
						</SidebarMenuButton>
					</CreateModuleModal>
				</SidebarGroupLabel>

				<SidebarMenu className="max-h-74 overflow-hidden overflow-y-auto">
					{items.length <= 0 && (
						<div className="flex flex-col justify-center items-center gap-4 mx-auto mt-2 p-3 border-2 border-primary-150 dark:border-primary-700 border-dashed rounded-md w-[95%] h-full text-center transition-all duration-300 ease-in-out">
							<p className="w-[200px] text-foreground/80 text-sm">
								There is no modules found in your workspace
							</p>
							<p className="w-[200px] text-foreground/80 text-sm">
								You can create a new module
							</p>
							<CreateModuleModal>
								<Button
									size="sm"
									variant="outline"
									className="hover:bg-accent dark:bg-secondary-800 border-2 border-primary-150 dark:border-primary-700 border-dashed rounded-md text-foreground/80 text-xs"
								>
									Create
								</Button>
							</CreateModuleModal>
						</div>
					)}
					<motion.div
						className="space-y-1 max-h-74"
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
						{items.map((item, idx) => (
							<NavModuleItem key={item.id + idx} item={item} />
						))}
					</motion.div>
				</SidebarMenu>
			</SidebarGroup>
		</>
	);
}
