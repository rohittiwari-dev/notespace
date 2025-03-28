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

const WorkspaceSetupSchema = z.object({
	workspaceName: z.string().min(1, { message: 'Workspace name is required' }),
	workspaceLogo: z
		.custom<FileList>()
		.refine(
			(files) => {
				return files?.[0]?.size <= MAX_FILE_SIZE;
			},
			{
				message: `More than ${MAX_FILE_SIZE} are not allowed`,
			},
		)
		.refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
			message: 'Only .jpg, .jpeg, .png and .webp formats are supported.',
		})
		.optional(),
	workSpaceIcon: z.string().optional(),
});

function SetupWorkspace() {
	const form = useForm<z.infer<typeof WorkspaceSetupSchema>>({
		resolver: zodResolver(WorkspaceSetupSchema),
		defaultValues: {
			workspaceName: 'Personal',
			workspaceLogo: undefined,
			workSpaceIcon: '📦',
		},
	});
	const selectedWorkspaceLogo = form?.watch('workspaceLogo');

	const onSubmit = async (data: z.infer<typeof WorkspaceSetupSchema>) => {
		console.log(data.workspaceLogo);
	};

	return (
		<Card className="bg-card/60 backdrop-blur-sm max-w-[min(450px,90%)]">
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
						<div className="text-5xl w-18 h-18 bg-secondary-800/80 border border-secondary-700/60 rounded-xl">
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
										className="bg-secondary-800/80 border-secondary-700/60 border cursor-pointer"
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
										onClick={() => {
											form.setValue(
												'workspaceLogo',
												undefined,
											);
										}}
										className="bg-secondary-800/80 border-secondary-700/60 border"
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
							placeholder="Name"
							{...form?.register('workspaceName')}
							className="bg-secondary-800/80 !border !border-secondary-700/60"
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
				</CardContent>
				<CardFooter className="flex w-full  justify-end items-center">
					<Button type="submit" className="w-full">
						Create Workspace
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}

export default SetupWorkspace;
