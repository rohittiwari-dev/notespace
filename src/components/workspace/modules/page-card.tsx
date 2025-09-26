import { format } from 'timeago.js';
import { Badge } from '@/components/ui/badge';
import { IFile } from '@/db/schemas';
import useAppStore from '@/store';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Ellipsis } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IconTrash } from '@tabler/icons-react';

export const FullPageCard = ({ page }: { page: IFile }) => {
	return (
		<Link
			href={`/space/${page?.workspace}/${page?.module}/${page.id}`}
			className="block"
		>
			<div className="bg-white/80 dark:bg-card/80 shadow p-2.5 rounded-lg w-[315px]">
				<div className="flex justify-between items-center gap-2 w-full">
					<span className="text-foreground/80 text-xs">
						{page?.created_at && format(page?.created_at)}
					</span>
					<Popover>
						<div
							onClick={(e) => {
								e.stopPropagation();
								e.preventDefault();
							}}
						>
							<PopoverTrigger className="hover:bg-white/10 p-1 rounded-md transition-colors cursor-pointer">
								<Ellipsis className="size-5" />
							</PopoverTrigger>
						</div>
						<PopoverContent
							className="p-1 w-25"
							align="end"
							sideOffset={-10}
						>
							<Button
								className="p-0.5 py-1.5 w-full h-fit hover:text-rose-500 text-xs"
								size="sm"
								variant="ghost"
							>
								<IconTrash />{' '}
								<span className="flex-1">Delete</span>
							</Button>
						</PopoverContent>
					</Popover>
				</div>
				<div className="flex-1">
					<div className="font-medium text-primary-200 dark:text-primary-500 text-sm">
						{page?.name}
					</div>
					<div className="mt-1 text-secondary-400 dark:text-secondary-600 text-xs">
						{page?.description}
					</div>
				</div>
				<div className="flex flex-wrap gap-1 mt-2">
					{page?.updated_at && (
						<div className="mb-1 w-full text-secondary-400 dark:text-secondary-600 text-xs">
							Edited : {format(page?.updated_at)}
						</div>
					)}
					{page?.tags?.map((tag) => (
						<Badge key={tag} className="mr-1 mb-1 capitalize">
							{tag}
						</Badge>
					))}
				</div>
			</div>
		</Link>
	);
};

function PageCard({ file }: { file: IFile }) {
	const { workspace, module } = useAppStore();

	return (
		<Link
			href={`/space/${workspace?.id}/${module?.id}/${file.id}`}
			className="block w-full"
		>
			<div className="flex gap-2 bg-white dark:bg-secondary-800/80 shadow shadow/70 p-4 rounded-lg w-full transition-colors cursor-pointer">
				{/* Heading */}
				<div>
					{file.cover ? (
						<Image
							src={file.cover}
							alt={`module${file.name}${file.id}`}
							width={100}
							height={100}
							className="size-4 object-center object-cover aspect-1"
						/>
					) : (
						file.icon
					)}
				</div>
				<div className="flex flex-col flex-1 overflow-hidden ga">
					<p className="mb-1 text-secondary-700 dark:text-secondary-100 !text-base">
						{file.name}
					</p>
					<p className="text-secondary-700 dark:text-secondary-200 !text-xs">
						{file.description}
					</p>
				</div>
				<div>
					{file.tags?.map((tag) => (
						<Badge key={tag} className="mr-1 mb-1 capitalize">
							{tag}
						</Badge>
					))}
					{file.updated_at && (
						<Badge variant="secondary">
							Edited: {format(file.updated_at, 'en_US')}
						</Badge>
					)}
				</div>
			</div>
		</Link>
	);
}

export default PageCard;
