'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

import trpc from '@/lib/trpc/client';
import {
	getColorFromClass,
	getRandomTailwindText400ShadeColor,
	oklchToHex,
} from '@/lib/utils/colors';
import useAppStore from '@/store';
import { createId } from '@orama/cuid2';
import { Grid2X2, LayoutDashboard, List, Plus, Search } from 'lucide-react';
import Image from 'next/image';
import React, { use, useEffect } from 'react';
import { toast } from 'sonner';
import LoadingCircle from '../../../../../components/icons/loading-circle';
import { useRouter } from 'next/navigation';

// Simple fallback FileNotSavedToast component

function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
	const trpcUtils = trpc.useUtils();
	const router = useRouter();
	const [viewMode, setViewMode] = React.useState<'list' | 'grid' | 'gallery'>(
		'list',
	);
	const [searchTerm, setSearchTerm] = React.useState('');
	const { moduleId } = use(params);
	const { setModule, module, addNewFile, removeFile } = useAppStore();

	const { mutateAsync: addFile, isPending } =
		trpc.modules.addNewFile.useMutation({
			onMutate: async (newFile) => {
				const tempId = newFile.file.id;
				addNewFile({
					...newFile.file,
					id: tempId,
					data: newFile.file.data as Array<{ [key: string]: any }>,
				});
				router.push(
					`/space/${module?.workspace}/${module?.id}/${tempId}`,
				);
				return { tempId };
			},
			onSuccess: (data, _variables, context) => {
				if (context?.tempId) {
					removeFile(context.tempId);
					addNewFile(data);
				}
				trpcUtils.modules.getModule.invalidate({
					moduleId: module?.id as string,
				});
				if (data?.id && context?.tempId && data.id !== context.tempId) {
					router.replace(
						`/space/${module?.workspace}/${module?.id}/${data.id}`,
					);
				}
			},
			onError: (_, _variables) => {
				toast.warning('File not saved.', {
					action: {
						label: 'Retry Save',
						onClick: async () => {
							await addFile(_variables);
						},
					},
					description:
						'File not saved to server. Your changes are local. Please retry.',
					duration: 8000,
				});
			},
		});

	useEffect(() => {
		if (moduleId) {
			setModule(moduleId);
		}
	}, [moduleId, setModule]);

	return (
		<section className="bg-sidebar/60 rounded-lg w-full h-full">
			<div className="flex justify-between items-center px-2 py-2 pb-3 border-secondary-foreground/20 border-b w-full">
				<div className="flex items-center gap-2">
					<span className="flex justify-center items-center gap-1 min-w-5 aspect-1">
						{module?.logo ? (
							<Image
								src={module?.logo}
								alt={`module${module?.name}${module?.id}`}
								width={100}
								height={100}
								className="size-5 object-center object-cover aspect-1"
							/>
						) : (
							module?.icon || (
								<div
									className="flex justify-center items-center rounded-full size-2"
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
							<Button
								disabled={isPending}
								size="sm"
								className="gap-0.5 h-6 text-xs"
								onClick={() => {
									addFile({
										moduleId: module?.id as string,
										file: {
											name: `Untitled`,
											data: [],
											id: createId(),
											icon: null,
											updated_at:
												new Date().toISOString(),
											created_at:
												new Date().toISOString(),
											tags: [],
											in_trash: false,
											type: 'page',
											workspace:
												module?.workspace as string,
											module: module?.id as string,
											owner: module?.owner as string,
										},
									});
								}}
							>
								{isPending ? (
									<LoadingCircle />
								) : (
									<Plus size={18} />
								)}{' '}
								New
							</Button>
						</TooltipTrigger>
						<TooltipContent>Create new page</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<div className="flex justify-between items-center gap-2 px-3 py-2 border-secondary-foreground/20 border-b w-full">
				<div className="group flex items-center gap-2 bg-secondary-50 dark:bg-secondary-800 dark:focus-within:bg-primary-800/50 shadow-sm px-2 border-input rounded-md focus-within:!ring-primary-300 focus-within:ring-1 dark:focus-within:!ring-primary-500 group-focus-within:ring-1 overflow-hidden transition-all duration-300 ease-in-out">
					<Search
						size={18}
						className="text-secondary-500 group-focus-within:text-primary-500 transition-all duration-300 ease-in-out"
					/>
					<Input
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="shadow-none !p-0 border-none !outline-none focus-visible:!ring-0 w-36 h-8 transition-all duration-300 ease-in-out"
					/>
				</div>
				<div>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="gap-0.5 w-6 h-6 text-xs"
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
								className="gap-0.5 w-6 h-6 text-xs"
							>
								<LayoutDashboard />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Gallery</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								onClick={() => setViewMode('grid')}
								variant={
									viewMode === 'grid' ? 'ghost' : 'outline'
								}
								size="icon"
								className="gap-0.5 w-6 h-6 text-xs"
							>
								<Grid2X2 />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Grid</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<div className="flex-1 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 p-4 w-full">
				{module?.files
					?.filter((val) => val.name.includes(searchTerm))
					?.map((file, index) => (
						<div key={file.id + index}>{file.name}</div>
					))}
			</div>
		</section>
	);
}

export default ModulePage;
