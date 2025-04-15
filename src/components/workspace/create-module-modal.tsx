import React, { useMemo } from 'react';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { cn, fileToBase64 } from '@/lib/utils';
import EmojiPicker from '../app-ui/EmojiPicker';
import { Label } from '../ui/label';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/tooltip';
import { Info, Trash, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import ColorInput from '../app-ui/color-input';
import {
	getColorFromClass,
	getRandomTailwindText400ShadeColor,
	oklchToHex,
} from '@/lib/utils/colors';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ModuleCreateFormSchema } from '@/lib/formschemas';
import { zodResolver } from '@hookform/resolvers/zod';
import trpc from '@/lib/trpc/client';
import { toast } from 'sonner';
import useAppStore from '@/store';
import Image from 'next/image';
import Spinner from '../app-ui/spinner';
import { Switch } from '@/components/ui/switch';

function CreateModuleModal({
	children,
	modalOnClose = () => {},
}: {
	children: React.ReactNode;
	modalOnClose?: () => void;
}) {
	const trpcUtils = trpc.useUtils();
	const [showIconImageChooser, setShowIconImageChooser] =
		React.useState(false);
	const [open, setOpen] = React.useState(false);
	const { user, workspace, setModule } = useAppStore();
	const { mutateAsync, isPending } = trpc.modules.createModule.useMutation({
		onSuccess: async (input) => {
			if (input?.id) setModule(input.id);
			await Promise.all([
				trpcUtils.modules.getModules.invalidate(),
				trpcUtils.modules.getModule.invalidate(),
			]);
		},
	});

	const randomColor = useMemo(() => {
		if (open) {
			return oklchToHex(
				getColorFromClass(getRandomTailwindText400ShadeColor()),
			);
		}
		return '';
	}, [open]);

	const { watch, handleSubmit, formState, reset, setValue, register } =
		useForm<z.infer<typeof ModuleCreateFormSchema>>({
			defaultValues: {
				moduleColor: randomColor,
				moduleLogo: undefined,
				moduleName: undefined,
				moduleIcon: undefined,
			},
			resolver: zodResolver(ModuleCreateFormSchema),
		});

	// Watcher form file
	const selectedModuleLogo = watch('moduleLogo');

	// Functions declarations
	const onSubmit = async (data: z.infer<typeof ModuleCreateFormSchema>) => {
		const logo = data.moduleLogo?.[0];
		try {
			let base64Logo = '';
			if (logo) {
				base64Logo = await fileToBase64(logo as File);
			}

			const newModule = await mutateAsync({
				name: data.moduleName,
				icon: data.moduleIcon as string,
				owner: user?.id as string,
				workspace: workspace?.id as string,
				color: data.moduleColor,
				logo:
					base64Logo && logo
						? {
								fileName: logo.name,
								fileType: logo.type,
								fileData: base64Logo,
								fileSize: logo.size,
							}
						: undefined,
			}).catch((error) => {
				throw error;
			});
			if (newModule) {
				toast.success('Module created successfully');
				handleClose(false);
			}
		} catch (error) {
			toast.error('Error creating workspace', {
				description: (error as any)?.message,
			});
		}
	};

	// handle close modal
	const handleClose = (state: boolean) => {
		setOpen(state);
		if (!state) {
			modalOnClose();
			setShowIconImageChooser(false);
			reset();
		}
	};

	return (
		<Dialog onOpenChange={handleClose} open={open} modal>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="!p-0  dark:!bg-transparent flex max-h-[90vh] overflow-y-auto  [&>button]:cursor-pointer">
				<DialogTitle className="sr-only">Create a Module</DialogTitle>
				<Card
					className={cn(
						'bg-card/60 backdrop-blur-sm w-full max-w-full',
					)}
				>
					<form onSubmit={handleSubmit(onSubmit)}>
						<CardHeader>
							<CardTitle>Create Module</CardTitle>
							<CardDescription>
								<p className="text-sm text-muted-foreground font-normal">
									This is a module/folder to organize your
									notes,
								</p>
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col gap-6 ">
							<div className="w-full flex-col gap-3 flex">
								<Label
									htmlFor="Switch-them-icon-and-image"
									className="w-full flex justify-between items-center"
								>
									<span className="text-secondary-500">
										Enable Icon/Image Option
									</span>
									<Switch
										id="Switch-them-icon-and-image"
										checked={showIconImageChooser}
										className="bg-secondary-700/90"
										onCheckedChange={(checked) => {
											setShowIconImageChooser(checked);
											if (!checked) {
												setValue(
													'moduleLogo',
													undefined,
												);
												setValue(
													'moduleIcon',
													undefined,
												);
											} else {
												setValue('moduleIcon', '📁');
											}
										}}
									/>
								</Label>
								{showIconImageChooser && (
									<div className="flex w-full gap-6">
										<div className="text-5xl w-18 h-18 bg-secondary-100  border-secondary-200/40 dark:bg-secondary-800/80 border dark:border-secondary-700/60 rounded-xl">
											{selectedModuleLogo?.[0] ? (
												<Image
													src={URL.createObjectURL(
														selectedModuleLogo[0],
													)}
													alt="workspace logo"
													width={100}
													height={100}
													className="rounded-xl"
												/>
											) : (
												<EmojiPicker
													disabled={
														formState.isSubmitting ||
														formState.isLoading ||
														isPending
													}
													getEmoji={(emoji) => {
														setValue(
															'moduleIcon',
															emoji,
														);
													}}
												>
													{watch('moduleIcon') ||
														formState.defaultValues
															?.moduleIcon}
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
															Workspace logo is
															paid feature
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
														className="border-secondary-200/30 bg-secondary-100 dark:bg-secondary-800/80  dark:border-secondary-700/60 border cursor-pointer"
													>
														<Label
															htmlFor="moduleLogo"
															className="flex items-center  cursor-pointer gap-2"
														>
															<Input
																type="file"
																id="moduleLogo"
																className="z-10 top-0 left-0"
																hidden
																{...register(
																	'moduleLogo',
																)}
																disabled={
																	formState.isSubmitting ||
																	formState.isLoading ||
																	isPending
																}
																accept="image/*"
															/>
															<Upload /> Upload
														</Label>
													</Button>
													<Button
														size="sm"
														variant="destructive"
														type="button"
														className="bg-secondary-100 dark:hover:bg-red-950 text-foreground hover:text-background dark:hover:text-foreground dark:bg-secondary-800/80 border-secondary-200/30 dark:border-secondary-700/60 border"
														disabled={
															formState.isSubmitting ||
															formState.isLoading ||
															isPending
														}
														onClick={() => {
															setValue(
																'moduleLogo',
																undefined,
															);
														}}
													>
														<Trash /> Remove
													</Button>
												</div>
												{formState.errors.moduleLogo
													?.message &&
													formState.touchedFields
														.moduleLogo && (
														<p className="text-[.7rem] text-red-500">
															{
																formState.errors
																	.moduleLogo
																	.message
															}
														</p>
													)}
												<p className="text-[.7rem] text-muted-foreground font-normal">
													*.png, *.jpg, *.jpeg files
													up to 1MB in 1:1 ratio
												</p>
											</div>
										</div>
									</div>
								)}
							</div>
							<div className="flex flex-col gap-2">
								<Label className="text-xs flex-col flex text-accent-foreground font-normal">
									Select your module color
								</Label>

								<ColorInput
									color={randomColor}
									inputEditable={false}
									disabled={
										formState.isSubmitting ||
										formState.isLoading ||
										isPending
									}
									onChange={(val) => {
										console.log(val);
										setValue('moduleColor', val);
									}}
								/>
								{formState.errors.moduleColor?.message &&
									formState.touchedFields.moduleColor && (
										<p className="text-[.7rem] text-red-500">
											{
												formState.errors.moduleColor
													.message
											}
										</p>
									)}
							</div>
							<div className="flex flex-col gap-2">
								<Label className="text-xs flex-col flex text-accent-foreground font-normal">
									Module Name
									<p className="text-xs text-muted-foreground font-normal">
										Module name is used to identify your
										module in the app.
									</p>
								</Label>

								<Input
									type="text"
									placeholder="Name"
									maxLength={25}
									disabled={
										formState.isSubmitting ||
										formState.isLoading ||
										isPending
									}
									className="dark:bg-secondary-800/80 bg-secondary-100 !border dark:!border-secondary-700/60"
									{...register('moduleName')}
								/>
								{formState.errors.moduleName?.message &&
									formState.touchedFields.moduleName && (
										<p className="text-[.7rem] text-red-500">
											{
												formState.errors.moduleName
													.message
											}
										</p>
									)}
							</div>
						</CardContent>
						<CardFooter className="flex w-full  justify-end items-center">
							<Button type="submit" className="w-full">
								{(formState.isSubmitting ||
									formState.isLoading ||
									isPending) && <Spinner />}{' '}
								Create Workspace
							</Button>
						</CardFooter>
					</form>
				</Card>
			</DialogContent>
		</Dialog>
	);
}

export default CreateModuleModal;
