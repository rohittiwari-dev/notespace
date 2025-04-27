'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@/components/ui/tooltip';
import PageCard from '@/components/workspace/modules/page-card';

import {
	getColorFromClass,
	getRandomTailwindText400ShadeColor,
	oklchToHex,
} from '@/lib/utils/colors';
import useAppStore from '@/store';
import { Grid2X2, LayoutDashboard, List, Plus, Search } from 'lucide-react';
import Image from 'next/image';
import React, { use, useEffect } from 'react';

function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
	const { moduleId } = use(params);
	const { setModule, module } = useAppStore();

	useEffect(() => {
		if (moduleId) {
			setModule(moduleId);
		}
	}, [moduleId, setModule]);

	return (
		<section className=" rounded-lg bg-sidebar/60 h-full w-full">
			<div className=" px-2 py-2 pb-3 border-b border-secondary-foreground/20 w-full flex justify-between items-center">
				<div className="flex items-center gap-2">
					<span className="aspect-1 gap-1 flex justify-center items-center min-w-5">
						{module?.logo ? (
							<Image
								src={module?.logo}
								alt={`module${module?.name}${module?.id}`}
								width={100}
								height={100}
								className="size-5 aspect-1 object-cover object-center"
							/>
						) : (
							module?.icon || (
								<div
									className="size-2 rounded-full flex justify-center items-center"
									style={{
										backgroundColor:
											module?.color ||
											oklchToHex(
												getColorFromClass(
													getRandomTailwindText400ShadeColor(),
												),
											),
									}}
								/>
							)
						)}
					</span>
					<p className="text-foreground/80">{module?.name}</p>
				</div>
				<div className="flex items-center gap-2">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button size="sm" className="h-6 text-xs gap-0.5">
								<Plus size={18} /> New
							</Button>
						</TooltipTrigger>
						<TooltipContent>Create new page</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<div className="w-full flex border-b border-secondary-foreground/20 justify-between items-center gap-2 py-2 px-3">
				<div className="flex transition-all duration-300 ease-in-out items-center gap-2 focus-within:ring-1 focus-within:!ring-primary-500 group-focus-within:ring-1 focus-within:bg-primary-800/50 bg-secondary-800 group rounded-md px-2">
					<Search
						size={18}
						className="text-secondary-500  transition-all duration-300 ease-in-out group-focus-within:text-primary-500"
					/>
					<Input className="h-8 w-36 !p-0 transition-all duration-300 ease-in-out bg-secondary-800  focus-visible:bg-primary-800/50 focus-visible:!ring-0 !outline-none" />
				</div>
				<div>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="h-6 w-6 text-xs gap-0.5"
							>
								<List />
							</Button>
						</TooltipTrigger>
						<TooltipContent>List</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="h-6 w-6 text-xs gap-0.5"
							>
								<LayoutDashboard />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Gallery</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="h-6 w-6 text-xs gap-0.5"
							>
								<Grid2X2 />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Grid</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols4 2xl:grid-cols-5 container @min-[50px]:grid-cols-5 gap-4 w-full p-4 flex-1">
				<PageCard />
				<PageCard />
				<PageCard />
				<PageCard />
				<PageCard />
				<PageCard />
				<PageCard />
				<PageCard />
			</div>
		</section>
	);
}

export default ModulePage;
