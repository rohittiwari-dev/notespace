'use client';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@/components/ui/tooltip';
import EmojiPicker from '../../app-ui/EmojiPicker';
import { Info, Upload, Trash } from 'lucide-react';
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ACCEPTED_IMAGE_TYPES } from '@/lib/constants';
import { MAX_FILE_SIZE } from '@/lib/constants';
import Image from 'next/image';
import { api } from '@/lib/trpc/client';

import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Spinner from '@/components/app-ui/spinner';
import { fileToBase64 } from '@/utils/fileToBase64';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { authClientApi } from '@/lib/auth/client';

const WorkspaceSetupSchema = z.object({
	workspaceName: z.string().min(1, { message: 'Workspace name is required' }),
	workspaceLogo: z
		.custom<FileList>()
		.refine(
			(files) => {
				return (files?.[0]?.size || MAX_FILE_SIZE) <= MAX_FILE_SIZE;
			},
			{
				message: `More than ${MAX_FILE_SIZE} are not allowed`,
			},
		)
		.refine(
			(files) =>
				ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type || 'image/jpeg'),
			{
				message:
					'Only .jpg, .jpeg, .png and .webp formats are supported.',
			},
		)
		.optional(),
	workspaceDescription: z.string().nonempty(),
	workSpaceIcon: z.string().default('📦').optional(),
});

function SetupWorkspace({
	cardClassName,
	redirectOnCreate = true,
	handleOnSuccess = () => {},
}: {
	cardClassName?: string;
	redirectOnCreate?: boolean;
	handleOnSuccess?: (workspace: any) => void;
}) {
	const router = useRouter();
	const { data: session } = authClientApi.useSession();
	const { mutateAsync, isPending } =
		api.workspace.createWorkspace.useMutation();

	/* Use Form and zod to validate the form */
	const form = useForm<z.infer<typeof WorkspaceSetupSchema>>({
		resolver: zodResolver(WorkspaceSetupSchema),
		defaultValues: {
			workspaceName: 'Personal',
			workspaceLogo: undefined,
			workSpaceIcon: '📦',
			workspaceDescription: undefined,
		},
	});
	const selectedWorkspaceLogo = form?.watch('workspaceLogo');

	/* Submit the form */
	const onSubmit = async (data: z.infer<typeof WorkspaceSetupSchema>) => {
		const logo = data.workspaceLogo?.[0];
		try {
			let base64Logo = '';
			if (logo) {
				base64Logo = await fileToBase64(logo as File);
			}

			const workspace = await mutateAsync({
				name: data.workspaceName,
				icon: data.workSpaceIcon as string,
				owner: session?.user?.id as string,
				description: data.workspaceDescription,
				logo: base64Logo
					? {
							fileName: logo?.name as string,
							fileType: logo?.type as string,
							fileData: base64Logo as string,
							fileSize: logo?.size as number,
						}
					: undefined,
			}).catch((error) => {
				throw error;
			});
			if (workspace) {
				toast.success('Workspace created successfully');
				if (redirectOnCreate) {
					router.replace(`/space/${workspace.id}`);
				}
				handleOnSuccess(workspace);
			}
		} catch (error) {
			toast.error('Error creating workspace', {
				description: (error as any)?.message,
			});
		}
	};

	return (
		<Card
			className={cn(
				'bg-card/60 backdrop-blur-sm max-w-[min(450px,90%)]',
				cardClassName,
			)}
		>
			<form onSubmit={form?.handleSubmit(onSubmit)}>
				<CardHeader>
					<CardTitle>Setup Your Workspace</CardTitle>
					<CardDescription>
						<p className="text-sm text-muted-foreground font-normal">
							Lets create and Setup Your private workspace to get
							you started.You can add collaborators later from the
							workspace settings tab.
						</p>
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-6 ">
					<div className="flex gap-6">
						<div className="text-5xl w-18 h-18 bg-secondary-100  border-secondary-200/40 dark:bg-secondary-800/80 border dark:border-secondary-700/60 rounded-xl">
							{selectedWorkspaceLogo?.[0] ? (
								<Image
									src={URL.createObjectURL(
										selectedWorkspaceLogo[0],
									)}
									alt="workspace logo"
									width={100}
									height={100}
									className="rounded-xl"
								/>
							) : (
								<EmojiPicker
									disabled={isPending}
									getEmoji={(emoji) => {
										form?.setValue('workSpaceIcon', emoji);
									}}
								>
									{form?.watch('workSpaceIcon') ||
										form.formState.defaultValues
											?.workSpaceIcon}
								</EmojiPicker>
							)}
						</div>
						<div className="space-y-2">
							<Label className="text-xs flex items-center gap-1 text-accent-foreground font-normal">
								Workspace logo{' '}
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<Info className="w-3.5 h-3.5" />
										</TooltipTrigger>
										<TooltipContent>
											Workspace logo is paid feature
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</Label>

							<div className="space-y-1">
								<div className="flex flex-col sm:flex-row gap-3">
									<Button
										size="sm"
										variant="secondary"
										type="button"
										disabled={isPending}
										className="border-secondary-200/30 bg-secondary-100 dark:bg-secondary-800/80  dark:border-secondary-700/60 border cursor-pointer"
									>
										<Label
											htmlFor="workspaceLogo"
											className="flex items-center  cursor-pointer gap-2"
										>
											<Input
												type="file"
												id="workspaceLogo"
												className="z-10 top-0 left-0"
												hidden
												disabled={isPending}
												accept="image/*"
												{...form?.register(
													'workspaceLogo',
												)}
											/>
											<Upload /> Upload
										</Label>
									</Button>
									<Button
										size="sm"
										variant="destructive"
										type="button"
										disabled={isPending}
										onClick={() => {
											form.setValue(
												'workspaceLogo',
												undefined,
											);
										}}
										className="bg-secondary-100 dark:hover:bg-red-950 text-foreground hover:text-background dark:hover:text-foreground dark:bg-secondary-800/80 border-secondary-200/30 dark:border-secondary-700/60 border"
									>
										<Trash /> Remove
									</Button>
								</div>
								{form?.formState.errors.workspaceLogo
									?.message &&
									form?.formState.dirtyFields
										.workspaceLogo && (
										<p className="text-[.7rem] text-red-500">
											{
												form?.formState.errors
													.workspaceLogo.message
											}
										</p>
									)}
								<p className="text-[.7rem] text-muted-foreground font-normal">
									*.png, *.jpg, *.jpeg files up to 1MB in 1:1
									ratio
								</p>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<Label className="text-xs flex-col flex text-accent-foreground font-normal">
							Workspace Name
							<p className="text-xs text-muted-foreground font-normal">
								Workspace name is used to identify your
								workspace in the app.
							</p>
						</Label>

						<Input
							type="text"
							disabled={isPending}
							placeholder="Name"
							{...form?.register('workspaceName')}
							className="dark:bg-secondary-800/80 bg-secondary-100 !border dark:!border-secondary-700/60"
						/>
						{form?.formState.errors.workspaceName?.message &&
							form?.formState.touchedFields.workspaceName && (
								<p className="text-[.7rem] text-red-500">
									{
										form?.formState.errors.workspaceName
											.message
									}
								</p>
							)}
					</div>
					<div className="flex flex-col gap-2">
						<Label className="text-xs flex-col flex text-accent-foreground font-normal">
							Workspace Description
							<p className="text-xs text-muted-foreground font-normal">
								Workspace Description is small information about
								your workspace.
							</p>
						</Label>

						<Textarea
							placeholder="Description"
							disabled={isPending}
							autoFocus={true}
							{...form?.register('workspaceDescription')}
							className="dark:bg-secondary-800/80 bg-secondary-100 !border dark:!border-secondary-700/60"
						/>
						{form?.formState.errors.workspaceDescription?.message &&
							form?.formState.touchedFields
								.workspaceDescription && (
								<p className="text-[.7rem] text-red-500">
									{
										form?.formState.errors
											.workspaceDescription.message
									}
								</p>
							)}
					</div>
				</CardContent>
				<CardFooter className="flex w-full  justify-end items-center">
					<Button
						type="submit"
						className="w-full"
						disabled={isPending}
					>
						{isPending && <Spinner color="secondary" />} Create
						Workspace
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}

export default SetupWorkspace;
