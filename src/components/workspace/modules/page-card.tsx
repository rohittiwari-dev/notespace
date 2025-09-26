import { format } from 'timeago.js';
import { Badge } from '@/components/ui/badge';
import { IFile } from '@/db/schemas';
import useAppStore from '@/store';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function PageCard({ file }: { file: IFile }) {
	const { workspace, module } = useAppStore();

	return (
		<Link
			href={`/space/${workspace?.id}/${module?.id}/${file.id}`}
			className="block w-full"
		>
			<div className="flex gap-2 bg-secondary-100/70 dark:bg-secondary-800/80 p-4 rounded-lg w-full transition-colors cursor-pointer">
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
