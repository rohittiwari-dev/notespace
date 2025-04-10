import React from 'react';
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
import { cn } from '@/lib/utils';
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

function CreateModuleModal({ children }: { children: React.ReactNode }) {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="!p-0  dark:!bg-transparent flex max-h-[90vh] overflow-y-auto  [&>button]:cursor-pointer">
				<DialogTitle className="sr-only">Create a Module</DialogTitle>
				<Card className={cn('bg-card/60 backdrop-blur-sm max-w-full')}>
					<form>
						<CardHeader>
							<CardTitle>Setup Your Workspace</CardTitle>
							<CardDescription>
								<p className="text-sm text-muted-foreground font-normal">
									Lets create and Setup Your private workspace
									to get you started.You can add collaborators
									later from the workspace settings tab.
								</p>
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col gap-6 ">
							<div className="flex gap-6">
								<div className="text-5xl w-18 h-18 bg-secondary-100  border-secondary-200/40 dark:bg-secondary-800/80 border dark:border-secondary-700/60 rounded-xl">
									<EmojiPicker>✨</EmojiPicker>
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
													/>
													<Upload /> Upload
												</Label>
											</Button>
											<Button
												size="sm"
												variant="destructive"
												type="button"
												className="bg-secondary-100 dark:hover:bg-red-950 text-foreground hover:text-background dark:hover:text-foreground dark:bg-secondary-800/80 border-secondary-200/30 dark:border-secondary-700/60 border"
											>
												<Trash /> Remove
											</Button>
										</div>

										<p className="text-[.7rem] text-muted-foreground font-normal">
											*.png, *.jpg, *.jpeg files up to 1MB
											in 1:1 ratio
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
									maxLength={25}
									className="dark:bg-secondary-800/80 bg-secondary-100 !border dark:!border-secondary-700/60"
								/>
							</div>
						</CardContent>
						<CardFooter className="flex w-full  justify-end items-center">
							<Button type="submit" className="w-full">
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
