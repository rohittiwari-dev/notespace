'use client';
import EmojiPicker from '@/components/app-ui/EmojiPicker';
import { Button } from '@/components/ui/button';
import CoverUpload from '@/components/ui/CoverImageUpload';

import { Input } from '@/components/ui/input';
import { IFile } from '@/db/schemas';
import { useDebouncedCallback } from '@/hooks/useDebounce';
import trpc from '@/lib/trpc/client';
import { fileToBase64 } from '@/lib/utils';
import useAppStore from '@/store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

// Simple fallback FileNotSavedToast component

const NoteHeader = ({
	noteId,
	moduleId,
}: {
	noteId: string;
	moduleId: string;
}) => {
	const router = useRouter();
	const trpcUtils = trpc.useUtils();
	const { module, updateFile, addNewFile, removeFile, moduleLoading } =
		useAppStore();
	const { mutate: updateFileBackend } = trpc.modules.updateFile.useMutation({
		onMutate: async (variables) => {
			await trpcUtils.modules.getModule.cancel({
				moduleId: variables.moduleId,
			});
			updateFile(variables.fileId, variables.file as any);
			const previousData = trpcUtils.modules.getModule.getData({
				moduleId: variables.moduleId,
			});
			return { previousData };
		},
		onError: (_, variables, context) => {
			if (context?.previousData) {
				trpcUtils.modules.getModule.setData(
					{ moduleId: variables.moduleId },
					context.previousData,
				);
			}
			toast.error('Failed to update file', {
				description:
					'Your changes could not be saved. Please try again.',
			});
		},
	});
	const { mutateAsync: addFile, isPending } =
		trpc.modules.addNewFile.useMutation({
			onMutate: async (newFile) => {
				const tempId = newFile.file.id;
				addNewFile({
					...newFile.file,
					id: tempId,
					data: newFile.file.data as Array<{ [key: string]: any }>,
				});
				return { tempId };
			},
			onError: (_, _variables) => {
				if (_variables?.file?.id) {
					removeFile(_variables.file.id);
				}
				toast.warning('File not saved.', {
					id: `${noteId}create-new-file`,
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
	const debouncedUpdate = useDebouncedCallback(
		(fileId: string, data: Partial<IFile>) => {
			updateFileBackend({
				file: {
					...data,
					updated_at: new Date().toISOString(),
				} as any,
				fileId: fileId,
				moduleId: moduleId,
			});
		},
		2000,
	);
	const debouncedUpdateCover = useDebouncedCallback(
		async (cover: File | null) => {
			const file = module?.files?.find((f) => f.id === noteId);
			if (cover && file) {
				const coverImageData = await fileToBase64(cover);
				updateFileBackend({
					file: {
						...file,
						cover: {
							fileName: cover?.name || '',
							fileType: cover?.type || '',
							fileData: coverImageData,
							fileSize: cover?.size || 0,
						},
						updated_at: new Date().toISOString(),
					},
					fileId: noteId,
					moduleId: moduleId,
				});
			}
		},
		1500,
	);

	const file = React.useMemo(
		() =>
			module?.files?.find((f) => f.id === noteId) ||
			({
				workspace: '',
				module: '',
				name: 'Untitled',
				data: [],
				id: noteId,
				icon: null,
				updated_at: null,
				created_at: null,
				owner: '',
				tags: [],
				in_trash: null,
				type: null,
				cover: null,
				coverPublicId: null,
				description: 'Write your note description here...',
			} as IFile),
		[module?.files, noteId],
	);

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (
				!moduleLoading &&
				!module?.files?.find((f) => f.id === noteId)
			) {
				toast.warning('Create New File ?', {
					description:
						'File does not exist. want to create new file or go back?',
					id: `${noteId}create-new-file`,
					action: (
						<div className="flex flex-col gap-2">
							<Button
								size="sm"
								disabled={isPending}
								variant="secondary"
								className="!text-[0.6rem]"
								onClick={() => {
									addFile({
										file: {
											...file,
											id: noteId,
											updated_at:
												new Date().toISOString(),
										},
										moduleId: moduleId,
									});
								}}
							>
								{isPending ? 'Creating...' : 'Create File'}
							</Button>
							<Button
								size="sm"
								variant="outline"
								className="!text-[0.6rem]"
								onClick={() => {
									router.back();
								}}
							>
								Go Back
							</Button>
						</div>
					),
					duration: 8000,
				});
			}
		}, 2000);
		return () => clearTimeout(timeout);
	}, [
		addFile,
		file,
		module?.files,
		moduleId,
		noteId,
		router,
		isPending,
		moduleLoading,
	]);

	return (
		<div className="flex flex-col rounded-t-lg w-full h-fit">
			<CoverUpload
				initialUrl={file?.cover || undefined}
				onImageChange={(cover) => {
					updateFile(noteId, {
						cover: cover ? URL.createObjectURL(cover) : null,
						updated_at: new Date().toISOString(),
					});
					debouncedUpdateCover(cover);
				}}
			/>
			<div className="p-4">
				{file?.icon && (
					<div className="relative bg-secondary-100 dark:bg-secondary-800 border-secondary-200 rounded-xl w-24 h-24 text-5xl cursor-pointer">
						<EmojiPicker
							getEmoji={(emoji) => {
								updateFile(noteId, {
									icon: emoji,
									updated_at: new Date().toISOString(),
								});
								debouncedUpdate(noteId, {
									icon: emoji,
									updated_at: new Date().toISOString(),
								});
							}}
						>
							{file.icon}
						</EmojiPicker>
					</div>
				)}
				<div className="flex flex-col gap-2 mt-4">
					<div className="flex justify-start items-center gap-2">
						{!file?.icon ? (
							<Button
								variant="link"
								size="sm"
								onClick={() => {
									updateFile(noteId, {
										icon: '📄',
										updated_at: new Date().toISOString(),
									});
									debouncedUpdate(noteId, {
										icon: '📄',
										updated_at: new Date().toISOString(),
									});
								}}
								className="!p-0 text-secondary-700 dark:text-secondary-150"
							>
								Add Icon
							</Button>
						) : (
							<Button
								variant="link"
								size="sm"
								onClick={() => {
									updateFile(noteId, {
										icon: null,
										updated_at: new Date().toISOString(),
									});
									debouncedUpdate(noteId, {
										icon: null,
										updated_at: new Date().toISOString(),
									});
								}}
								className="!p-0 text-secondary-700 dark:text-secondary-150"
							>
								Remove Icon
							</Button>
						)}
					</div>
					<Input
						className="!p-0 !border-none !outline-none focus-visible:!ring-0 dark:focus-visible:ring-0 font-semibold !text-3xl"
						value={file?.name}
						onChange={(e) => {
							updateFile(noteId, {
								name: e.target.value,
								updated_at: new Date().toISOString(),
							});
							debouncedUpdate(noteId, {
								name: e.target.value,
								updated_at: new Date().toISOString(),
							});
						}}
					/>
					<Input
						className="!p-0 !border-none !outline-none focus-visible:!ring-0 dark:focus-visible:ring-0 text-secondary-500 dark:text-secondary-400 !text-lg"
						value={
							file?.description ||
							'Write your note description here...'
						}
						onChange={(e) => {
							updateFile(noteId, {
								description: e.target.value,
								updated_at: new Date().toISOString(),
							});
							debouncedUpdate(noteId, {
								description: e.target.value,
								updated_at: new Date().toISOString(),
							});
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default NoteHeader;
