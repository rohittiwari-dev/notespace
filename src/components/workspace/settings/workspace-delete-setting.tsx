import { SettingSectionItem } from '@/components/app-ui/setting-section';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import useAppStore from '@/store';
import trpc from '@/lib/trpc/client';

import Spinner from '@/components/app-ui/spinner';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DeleteWorkspaceZodFormSchema } from '@/lib/formschemas';
import { z } from 'zod';
import { toast } from 'sonner';
import { useClientCookies } from '@/hooks/useClientCookies';
import { SELECTED_SPACE_COOKIE_NAME } from '@/lib/constants';
import { redirect } from 'next/navigation';

function WorkspaceDeleteSetting({ workspaceId }: { workspaceId?: string }) {
	const { removeCookie } = useClientCookies();
	const trpcUtils = trpc.useUtils();
	const { deleteWorkspace, workspace } = useAppStore();
	const { mutateAsync: softDelete, isPending: isSoftDeletePending } =
		trpc.workspace.softDeleteWorkspace.useMutation({
			onSuccess: (Input) => {
				removeCookie(SELECTED_SPACE_COOKIE_NAME);
				deleteWorkspace(Input.id);
				trpcUtils.workspace.getWorkspaces.invalidate();
			},
		});
	const { mutateAsync: hardDelete, isPending: isHardDeletePending } =
		trpc.workspace.hardDeleteWorkspace.useMutation({
			onSuccess: (Input) => {
				removeCookie(SELECTED_SPACE_COOKIE_NAME);
				deleteWorkspace(Input.id, 'hard');
				trpcUtils.workspace.getWorkspaces.invalidate();
			},
		});

	const form = useForm<z.infer<typeof DeleteWorkspaceZodFormSchema>>({
		resolver: zodResolver(DeleteWorkspaceZodFormSchema),
	});

	const onsubmit = form.handleSubmit(async (data) => {
		if (!workspaceId) return;
		if (data.workspaceName !== workspace?.name) {
			toast.error('Workspace name does not match. Please try again.');
			return;
		}
		await hardDelete(workspaceId);
		form.reset();
		toast.success('Workspace deleted successfully');
		redirect(`/space`);
	});

	const onsubmitSoft = form.handleSubmit(async (data) => {
		if (!workspaceId) return;
		if (data.workspaceName !== workspace?.name) {
			toast.error('Workspace name does not match. Please try again.');
			return;
		}
		await softDelete(workspaceId);
		form.reset();
		toast.success('Workspace deleted successfully');
		redirect(`/space`);
	});

	return (
		<div className="text-foreground/90 space-y-4">
			<SettingSectionItem
				settingName="Delete Workspace"
				description="This setting will move your workspace to trash"
				settingContainerClassName="text-foreground dark:text-foreground/80 p-0"
				body={
					<Dialog>
						<div className="w-[65%] border-l flex items-center gap-2 pl-8 ">
							<DialogTrigger asChild>
								<Button
									disabled={
										isSoftDeletePending ||
										isHardDeletePending
									}
									variant="destructive"
								>
									{isSoftDeletePending ? (
										<Spinner className="text-light" />
									) : (
										<Trash2 />
									)}
									Delete
								</Button>
							</DialogTrigger>
						</div>
						<DialogContent>
							<form onSubmit={onsubmitSoft} className="space-y-4">
								<DialogHeader>
									<DialogTitle>
										Delete your Workspace
									</DialogTitle>
								</DialogHeader>
								<DialogDescription>
									Are you sure you want move your workspace to
									trash?
								</DialogDescription>
								<div className="space-y-1">
									<Input
										id="workspaceName"
										type="text"
										placeholder="Enter the name of workspace"
										className="dark:bg-secondary-800/80 placeholder:text-secondary-500 bg-secondary-100 !border dark:!border-secondary-700/60"
										{...form.register('workspaceName')}
									/>
									{form.formState.errors.workspaceName
										?.message &&
										form.formState.touchedFields
											.workspaceName && (
											<p className="text-[.7rem] text-red-500">
												{
													form.formState.errors
														.workspaceName.message
												}
											</p>
										)}
								</div>
								<DialogDescription>
									To confirm, type the name of your workspace
									here.{' '}
									<code className="dark:bg-red-950 bg-secondary-100 rounded-sm p-0.5 px-1.5">
										{workspace?.name}
									</code>
								</DialogDescription>
								<DialogFooter>
									<DialogClose asChild>
										<Button
											disabled={
												isSoftDeletePending ||
												isHardDeletePending
											}
											variant="ghost"
										>
											Cancel
										</Button>
									</DialogClose>
									<Button
										type="submit"
										disabled={
											isSoftDeletePending ||
											isHardDeletePending
										}
										variant="destructive"
									>
										{isSoftDeletePending ? (
											<Spinner className="text-light" />
										) : (
											<Trash2 />
										)}
										Move to trash
									</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				}
			/>
			<SettingSectionItem
				settingName="Permanently Delete Workspace"
				description="This setting will permanently delete your workspace"
				settingContainerClassName="text-foreground dark:text-foreground/80 p-0"
				body={
					<Dialog>
						<div className="w-[65%] border-l flex items-center gap-2 pl-8 ">
							<DialogTrigger asChild>
								<Button
									disabled={
										isSoftDeletePending ||
										isHardDeletePending
									}
									variant="destructive"
								>
									{isHardDeletePending ? (
										<Spinner className="text-light" />
									) : (
										<Trash2 />
									)}
									Permanently Delete
								</Button>
							</DialogTrigger>
						</div>
						<DialogContent>
							<form onSubmit={onsubmit} className="space-y-4">
								<DialogHeader>
									<DialogTitle>
										Delete your Workspace Permanently
									</DialogTitle>
								</DialogHeader>
								<DialogDescription>
									Are you sure you want to permanently delete
									?.
								</DialogDescription>
								<div className="space-y-1">
									<Input
										id="workspaceName"
										type="text"
										placeholder="Enter the name of workspace"
										className="dark:bg-secondary-800/80 placeholder:text-secondary-500 bg-secondary-100 !border dark:!border-secondary-700/60"
										{...form.register('workspaceName')}
									/>
									{form.formState.errors.workspaceName
										?.message &&
										form.formState.touchedFields
											.workspaceName && (
											<p className="text-[.7rem] text-red-500">
												{
													form.formState.errors
														.workspaceName.message
												}
											</p>
										)}
								</div>
								<DialogDescription>
									To confirm, type the name of your workspace
									here.{' '}
									<code className="dark:bg-red-950 bg-secondary-100 rounded-sm p-0.5 px-1.5">
										{workspace?.name}
									</code>
								</DialogDescription>
								<DialogFooter>
									<DialogClose asChild>
										<Button
											disabled={
												isSoftDeletePending ||
												isHardDeletePending
											}
											variant="ghost"
										>
											Cancel
										</Button>
									</DialogClose>
									<Button
										type="submit"
										disabled={
											isSoftDeletePending ||
											isHardDeletePending
										}
										variant="destructive"
									>
										{isHardDeletePending ? (
											<Spinner className="text-light" />
										) : (
											<Trash2 />
										)}
										Permanently Delete
									</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				}
			/>
		</div>
	);
}

export default WorkspaceDeleteSetting;
