'use client';
import React, { useCallback } from 'react';
import logo from '@/assets/Logo_Small.png';
import AnimatedTabContent from '@/components/app-ui/animated-tab-content';
import SettingSection, {
	SettingSectionItem,
} from '@/components/app-ui/setting-section';
import { Button } from '@/components/ui/button';
import ThemeSelectorSetting from '@/components/workspace/settings/theme-selector-setting';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import useAppStore from '@/store';
import trpc from '@/lib/trpc/client';
import _ from 'lodash';
import Spinner from '@/components/app-ui/spinner';
import Image from 'next/image';
import { Info, Trash, Upload } from 'lucide-react';
import EmojiPicker from '@/components/app-ui/EmojiPicker';
import { Label } from '@/components/ui/label';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { IWorkSpace } from '@/db/schemas';
import { fileToBase64 } from '@/lib/utils';
import WorkspaceDeleteSetting from './workspace-delete-setting';

// create form action state with zod schema WorkspaceGeneralSettingsSchema
function GeneralSettings({}: {}) {
	const trpcUtils = trpc.useUtils();
	const { workspace, updateWorkspace } = useAppStore();
	const { mutate, isPending } = trpc.workspace.updateWorkspace.useMutation({
		onSuccess: () => {
			trpcUtils.workspace.getWorkspaces.invalidate();
			trpcUtils.workspace.getWorkspace.invalidate();
		},
	});
	const { mutate: RemoveLogoMutate, isPending: RemoveLogoIsPending } =
		trpc.workspace.removeLogo.useMutation({
			onSuccess: () => {
				trpcUtils.workspace.getWorkspaces.invalidate();
				trpcUtils.workspace.getWorkspace.invalidate();
			},
		});

	const debouncedMutate = useCallback(() => {
		return _.debounce(
			(
				workspace: Partial<
					Omit<IWorkSpace, 'logo'> & {
						logo: {
							fileName: string;
							fileType: string;
							fileData: string;
							fileSize: number;
						} | null;
					}
				>,
				workspaceId: string,
			) => {
				mutate({
					workspace: { ...workspace },
					workspaceId: workspaceId,
				});
			},
			700,
		);
	}, [mutate])();

	const debouncedRemoveLogoMutate = useCallback(() => {
		return _.debounce((workspaceId: string) => {
			RemoveLogoMutate({
				workspaceId: workspaceId,
			});
		}, 700);
	}, [RemoveLogoMutate])();

	return (
		<AnimatedTabContent>
			<SettingSection
				settingName="Workspace Settings"
				settingContainerClassName="font-semibold"
				body={
					(isPending || RemoveLogoIsPending) && (
						<div className="flex gap-2 !text-blue-400 font-light items-center justify-center">
							<Spinner size="xs" className="!text-blue-400" />{' '}
							Saving..
						</div>
					)
				}
				description="Change the basic settings of your workspace"
				SettingContent={
					<div className="text-foreground/90 space-y-4">
						<SettingSectionItem
							settingName="Workspace Logo"
							description="Change Your Workspace Logo from here"
							settingContainerClassName="text-foreground dark:text-foreground/80 p-0"
							body={
								<div className="w-[65%] border-l flex items-center gap-2 pl-8 ">
									<div className="text-5xl w-18 h-18 bg-secondary-100  border-secondary-200/40 dark:bg-secondary-800/80 border dark:border-secondary-700/60 rounded-xl">
										{!workspace?.logo ? (
											<EmojiPicker
												disabled={isPending}
												getEmoji={(emoji) => {
													if (workspace?.id) {
														updateWorkspace(
															workspace.id,
															{
																icon: emoji,
															},
														);
														debouncedMutate(
															{
																icon: emoji,
															},
															workspace.id,
														);
													}
												}}
											>
												{workspace?.icon}
											</EmojiPicker>
										) : (
											<Image
												src={workspace?.logo || logo}
												alt="workspace logo"
												width={100}
												height={100}
												className="rounded-xl aspect-1 object-cover"
											/>
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
														Workspace logo is paid
														feature
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
													disabled={
														isPending ||
														RemoveLogoIsPending
													}
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
															onChange={async (
																e,
															) => {
																const file =
																	e.target
																		.files?.[0];
																if (file) {
																	if (
																		workspace?.id
																	) {
																		updateWorkspace(
																			workspace.id,
																			{
																				logo: URL.createObjectURL(
																					file,
																				),
																			},
																		);
																		debouncedMutate(
																			{
																				logo: {
																					fileName:
																						file.name,
																					fileType:
																						file.type,
																					fileData:
																						await fileToBase64(
																							file as File,
																						),
																					fileSize:
																						file.size,
																				},
																			},
																			workspace.id,
																		);
																	}
																}
															}}
														/>
														<Upload /> Upload
													</Label>
												</Button>
												<Button
													size="sm"
													variant="destructive"
													type="button"
													disabled={
														RemoveLogoIsPending ||
														isPending
													}
													onClick={() => {
														if (workspace?.id) {
															updateWorkspace(
																workspace.id,
																{
																	logo: null,
																},
															);
															debouncedRemoveLogoMutate(
																workspace.id,
															);
														}
													}}
													className="bg-secondary-100 dark:hover:bg-red-950 text-foreground hover:text-background dark:hover:text-foreground dark:bg-secondary-800/80 border-secondary-200/30 dark:border-secondary-700/60 border"
												>
													<Trash /> Remove
												</Button>
											</div>
											<p className="text-[.7rem] text-muted-foreground font-normal">
												*.png, *.jpg, *.jpeg files up to
												1MB in 1:1 ratio
											</p>
										</div>
									</div>
								</div>
							}
						/>
						<SettingSectionItem
							settingName="Workspace Name"
							description="Change Your Workspace Name"
							settingContainerClassName="text-foreground dark:text-foreground/80 p-0"
							body={
								<div className="w-[65%] border-l flex items-center gap-2 pl-8 ">
									<Input
										maxLength={25}
										className="w-96 bg-accent/20"
										value={workspace?.name || ''}
										onChange={(e) => {
											// Update the global state
											if (workspace?.id) {
												updateWorkspace(workspace.id, {
													name: e.currentTarget.value,
												});
												debouncedMutate(
													{
														name: e.currentTarget
															.value,
													},
													workspace.id,
												);
											}
										}}
									/>
								</div>
							}
						/>
					</div>
				}
			/>

			<Separator className="opacity-70 bg-accent" />

			<SettingSection
				settingName="Appearance"
				settingContainerClassName="font-semibold"
				description="Change how your public dashboard looks and feels"
				SettingContent={
					<div className="text-foreground/90 space-y-4">
						<SettingSectionItem
							settingName="Brand Color"
							description="Select or customize your brand color"
							settingContainerClassName="text-foreground dark:text-foreground/80 p-0"
							body={
								<div className="w-[65%] border-l flex items-center gap-2 pl-8 ">
									<Button className="!bg-red-500 hover:opacity-80 hover:scale-105 transition-all ease-in-out rounded-full  !w-[40px] !h-[40px] aspect-1" />
									<Button className="!bg-primary-400 hover:opacity-80 hover:scale-105 transition-all ease-in-out rounded-full  !w-[40px]  !h-[40px] aspect-1" />
									<Button className="!bg-violet-500  hover:opacity-80 hover:scale-105 transition-all ease-in-out rounded-full  !w-[40px]  !h-[40px] aspect-1" />
									<Button className="!bg-blue-500 hover:opacity-80 hover:scale-105 transition-all ease-in-out rounded-full  !w-[40px]  !h-[40px] aspect-1" />
									<Button className="!bg-accent-orange hover:opacity-80 hover:scale-105 transition-all ease-in-out rounded-full  !w-[40px]  !h-[40px] aspect-1" />
									<Button className="!bg-accent-pink hover:opacity-80 hover:scale-105 transition-all ease-in-out rounded-full  !w-[40px]  !h-[40px] aspect-1" />
									<Button className="!bg-accent-yellow hover:opacity-80 hover:scale-105 transition-all ease-in-out rounded-full  !w-[40px]  !h-[40px] aspect-1" />
									<Button className="!bg-accent-purple hover:opacity-80 hover:scale-105 transition-all ease-in-out rounded-full  !w-[40px]  !h-[40px] aspect-1" />
								</div>
							}
						/>
						<SettingSectionItem
							settingName="Theme"
							description="Select or customize your app theme"
							settingContainerClassName="text-foreground dark:text-foreground/80 p-0"
							body={
								<div className="w-[65%] border-l flex items-center gap-2 pl-8 ">
									<ThemeSelectorSetting />
								</div>
							}
						/>
					</div>
				}
			/>

			<Separator className="opacity-70 bg-accent" />

			<SettingSection
				settingName="Danger Zone"
				settingContainerClassName="font-semibold"
				description="This setting is responsible for deleting your workspace or deactivating your account"
				SettingContent={
					<WorkspaceDeleteSetting workspaceId={workspace?.id} />
				}
			/>
		</AnimatedTabContent>
	);
}

export default GeneralSettings;
