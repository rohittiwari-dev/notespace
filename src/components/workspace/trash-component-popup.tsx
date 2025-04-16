'use client';
import React, { useEffect } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/tooltip';
import { Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import trpc from '@/lib/trpc/client';
import useAppStore from '@/store';
import { toast } from 'sonner';

const TrashItem = ({
	data,
}: {
	data: { name: string; type: 'Module'; id: string };
}) => {
	const trpcUtils = trpc.useUtils();
	const {
		mutateAsync: moduleRestoreAsync,
		isPending: moduleRestoreIsPending,
	} = trpc.modules.restoreModule.useMutation({
		onSuccess: async () => {
			trpcUtils.modules.getTrashItems.invalidate();
			trpcUtils.modules.getModules.invalidate();
		},
	});
	return (
		<div className="hover:bg-accent/40 transition-all duration-150 ease-in-out cursor-pointer  group flex items-center  px-1.5 justify-between py-0.5 rounded">
			<span>{data.name}</span>
			<Button
				variant="ghost"
				size="sm"
				onClick={() => {
					if (data.type === 'Module')
						toast.promise(
							moduleRestoreAsync({
								moduleId: data.id?.toString(),
							}),
							{
								loading: `Restoring ${data.type}...`,
								success: `${data.type} Restored`,
								error: 'Error restoring',
							},
						);
				}}
				disabled={moduleRestoreIsPending}
				className="h-6 text-xs text-foreground hidden hover:bg-background/80 group-hover:flex transition-all duration-150 ease-in-out"
			>
				<Icon name="Recycle" /> Restore
			</Button>
		</div>
	);
};

function TrashPopUpComponent({
	dropdownContentAlign = 'bottom',
	children,
}: {
	dropdownContentAlign?: 'bottom' | 'right' | 'top' | 'left' | undefined;
	children: React.ReactNode;
}) {
	const { workspace } = useAppStore();
	const [trashItems, setTrashItems] = React.useState<
		{ name: string; type: 'Module'; id: string }[]
	>([]);
	const { data: modules } = trpc.modules.getTrashItems.useQuery(
		{ workspaceId: workspace?.id || '' },
		{
			enabled: !!workspace?.id,
		},
	);

	useEffect(() => {
		setTrashItems(
			modules?.map((item) => ({
				name: item.name,
				type: 'Module',
				id: item.id,
			})) || [],
		);
	}, [modules]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-[--radix-dropdown-menu-trigger-width] dark:bg-secondary-800/60 border-2 border-accent/40 max-w-72 min-w-56 rounded-lg p-2"
				side={dropdownContentAlign}
				align="end"
				sideOffset={4}
			>
				<DropdownMenuLabel className="p-0 font-normal flex gap-3 items-center">
					<Input className="!border-foreground/30 h-8" autoFocus />{' '}
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Info className="w-3.5 h-3.5" />
							</TooltipTrigger>
							<TooltipContent className="max-w-[180px]">
								Trash item will be deleted permanently after 30
								days
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</DropdownMenuLabel>

				<div className="mt-2 flex flex-col gap-1">
					{trashItems.length <= 0 && (
						<div className="flex  mx-auto p-3 rounded-md mt-2  w-[70%] flex-col items-center text-center justify-center h-full gap-2">
							<Icon name="Recycle" size={30} />
							<p className="text-sm text-foreground/80">
								There is no Trash Items found in your workspace
							</p>
						</div>
					)}
					{trashItems.map((item) => (
						<TrashItem key={item.id} data={item} />
					))}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default TrashPopUpComponent;
