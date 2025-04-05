'use client';
import {
	Form,
	FormItem,
	FormField,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { WorkspaceGeneralSettingsSchema } from '@/lib/formschemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import Logo from '@/assets/Logo_Full.png';

import AnimatedTabContent from '@/components/app-ui/animated-tab-content';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import EmojiPicker from '@/components/app-ui/EmojiPicker';
import { Info } from 'lucide-react';
import {
	Tooltip,
	TooltipProvider,
	TooltipTrigger,
	TooltipContent,
} from '@/components/ui/tooltip';
import { Upload } from 'lucide-react';
import { Trash } from 'lucide-react';

// create form action state with zod schema WorkspaceGeneralSettingsSchema
const formSchema = WorkspaceGeneralSettingsSchema;
const initialState = {
	name: '',
	description: '',
	icon: '',
	thumbnail: '',
	logo: '',
	tags: [],
	in_trash: false,
};
function GeneralSettings({}: {}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialState,
	});
	const logo = form.watch('logo');
	const thumbnail = form.watch('thumbnail');

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		console.log(data);
	};
	return (
		<AnimatedTabContent>
			<div className="flex justify-around gap-8 p-2 w-full">
				<div className="flex flex-col gap-4 w-1/2">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col gap-6"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="gap-2">
										<FormLabel>Workspace Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												className="dark:bg-secondary-800/80 bg-secondary-100 !border dark:!border-secondary-700/60"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem className="gap-2">
										<FormLabel>
											Workspace Description
										</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												className="dark:bg-secondary-800/80 max-h-21 bg-secondary-100 !border dark:!border-secondary-700/60"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">Save</Button>
						</form>
					</Form>
				</div>
				<div className="flex flex-col gap-2 w-1/2">
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
					<div className="flex gap-4">
						<div className="text-5xl w-20 h-20 bg-secondary-100 hover:opacity-80  border-secondary-200/40 dark:bg-secondary-800/80 border dark:border-secondary-700/60 rounded-xl">
							{typeof logo === 'string' && logo?.[0] ? (
								<Image
									src={
										typeof logo === 'string'
											? logo
											: URL.createObjectURL(logo[0])
									}
									alt="workspace logo"
									width={100}
									height={100}
									className="rounded-xl"
								/>
							) : (
								<EmojiPicker
									disabled={form.formState.isSubmitting}
									getEmoji={(emoji) => {
										form?.setValue('icon', emoji);
									}}
								>
									{form?.watch('icon') ||
										form.formState.defaultValues?.icon}
								</EmojiPicker>
							)}
						</div>

						<div className="space-y-1 flex flex-col justify-end">
							<div className="flex flex-col sm:flex-row gap-3">
								<Button
									size="sm"
									variant="secondary"
									type="button"
									disabled={false}
									className="border-secondary-200/30 bg-secondary-100 dark:bg-secondary-800/80  dark:border-secondary-700/60 border cursor-pointer"
								>
									<Label
										htmlFor="workspace-icon"
										className="flex items-center  cursor-pointer gap-2"
									>
										<Input
											type="file"
											id="workspace-icon"
											className="z-10 top-0 left-0"
											hidden
											disabled={false}
											accept="image/*"
											{...form?.register('logo')}
										/>
										<Upload /> Upload
									</Label>
								</Button>
								<Button
									size="sm"
									variant="destructive"
									type="button"
									disabled={false}
									onClick={() => {
										form.setValue('logo', undefined);
									}}
									className="bg-secondary-100 dark:hover:bg-red-950 text-foreground hover:text-background dark:hover:text-foreground dark:bg-secondary-800/80 border-secondary-200/30 dark:border-secondary-700/60 border"
								>
									<Trash /> Remove
								</Button>
							</div>
							{form?.formState.errors.logo?.message &&
								form?.formState.dirtyFields.logo && (
									<p className="text-[.7rem] text-red-500">
										{form?.formState.errors.logo.message}
									</p>
								)}
							<p className="text-[.7rem] text-muted-foreground font-normal">
								*.png, *.jpg, *.jpeg files up to 1MB in 1:1
								ratio
							</p>
						</div>
					</div>
					{/* cursor i need ui awesome */}

					<Button className="min-h-32 mt-3 bg-secondary hover:bg-secondary hover:opacity-80 ring-secondary-100/60 rounded-lg dark:ring-secondary-700/50 ring-1">
						<Label
							htmlFor="workspace-logo"
							className="flex items-center w-full h-full cursor-pointer gap-2"
						>
							<Input
								type="file"
								id="workspace-logo"
								className="z-10 top-0 left-0"
								hidden
								disabled={false}
								accept="image/*"
								{...form?.register('logo')}
							/>

							<Image
								src={
									!thumbnail
										? Logo
										: typeof thumbnail === 'string'
											? thumbnail
											: URL.createObjectURL(
													thumbnail?.[0],
												)
								}
								alt="workspace logo"
								width={2000}
								height={2000}
								quality={100}
								className="rounded-xl w-full h-auto "
							/>
						</Label>
					</Button>
				</div>
			</div>
		</AnimatedTabContent>
	);
}

export default GeneralSettings;
