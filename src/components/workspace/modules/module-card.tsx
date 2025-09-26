import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { IModule } from '@/db/schemas';
import { IconTrash } from '@tabler/icons-react';
import { Ellipsis } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { format } from 'timeago.js';

const ModuleCard = ({ module }: { module: IModule }) => {
	return (
		<>
			<svg
				className="invisible absolute shadow"
				width="0"
				height="0"
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
			>
				<defs>
					<filter id="round">
						<feGaussianBlur
							in="SourceGraphic"
							stdDeviation="5"
							result="blur"
						/>
						<feColorMatrix
							in="blur"
							mode="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
							result="goo"
						/>
						<feComposite
							in="SourceGraphic"
							in2="goo"
							operator="atop"
						/>
					</filter>
				</defs>
			</svg>
			<Link
				href={`/space/${module?.workspace}/${module?.id}`}
				id="module_folder"
				className='block before:block before:top-0 before:right-0 before:bottom-0 before:left-0 z-0 before:-z-10 before:absolute relative before:bg-current shadow-md shadow-primary-300 dark:shadow-primary-800 filter-[url(#round)] p-4 pt-8 border w-full before:w-full max-w-50 before:h-full min-h-30 max-h-[10px] text-white/60 dark:text-card/90 before:content-[""] transition-all duration-300 cursor-pointer select-none'
			>
				<div className="top-6 z-50 absolute flex flex-col justify-between w-[170px] h-[85px] text-foreground dark:text-white">
					<div className="flex justify-start items-center gap-2">
						<span className="flex justify-center items-center min-w-2 aspect-1">
							{!module.logo && !module.icon && (
								<div
									className="bg-gray-300 rounded-full w-[10px] h-[10px]"
									style={{
										backgroundColor:
											module.color || 'transparent',
									}}
								/>
							)}
							{module.logo ? (
								<Image
									src={module.logo}
									alt={`module${module.name}${module.id}`}
									width={100}
									height={100}
									className="size-4 object-center object-cover aspect-1"
								/>
							) : (
								module.icon
							)}
						</span>
						<span>{module.name}</span>
					</div>

					<div className="flex justify-between items-center w-full">
						<h1 className="text-xs">
							{format(module.created_at || new Date())}
						</h1>
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
				</div>
			</Link>
		</>
	);
};

export default ModuleCard;
