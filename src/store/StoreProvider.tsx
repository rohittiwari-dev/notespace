'use client';
import { IWorkSpace } from '@/db/schemas';
import { Session, User } from 'better-auth';
import React, { useEffect } from 'react';
import useAppStore from '.';
import trpc from '@/lib/trpc/client';
import { getUrlIds } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const StoreProvider = ({
	InitialWorkspaces,
	session,
	user,
	children,
}: {
	children: React.ReactNode;
	session: null | Session;
	user: null | User;
	InitialWorkspaces: IWorkSpace[];
}) => {
	const pathname = usePathname();
	const { fileId, moduleId, workspaceId } = getUrlIds(pathname);
	const {
		setWorkspaces,
		setUserAndSession,
		setModulesState,
		setWorkspace,
		setModules,
	} = useAppStore();

	console.log(workspaceId);

	const { data: workspaces } = trpc.workspace.getWorkspaces.useQuery(
		{
			userId: user?.id || '',
		},
		{
			enabled: !!user?.id,
			initialData: InitialWorkspaces,
			refetchOnWindowFocus: true,
			refetchOnReconnect: true,
			refetchOnMount: true,
		},
	);
	const { data: workspace } = trpc.workspace.getWorkspace.useQuery(
		{
			workspaceId: workspaceId || '',
		},
		{
			enabled: !!workspaceId,
			initialData: workspaces?.find((ws) => ws.id === workspaceId),
			refetchOnWindowFocus: true,
			refetchOnReconnect: true,
			refetchOnMount: true,
		},
	);
	const { data: modules } = trpc.modules.getModules.useQuery(
		{
			workspaceId: workspaceId || '',
		},
		{
			enabled: !!workspaceId,
			refetchOnWindowFocus: true,
			refetchOnReconnect: true,
			refetchOnMount: true,
		},
	);
	const { data: module, isFetching: isModuleFetching } =
		trpc.modules.getModule.useQuery(
			{
				moduleId: moduleId || '',
			},
			{
				enabled: !!moduleId,
				refetchOnWindowFocus: true,
				refetchOnReconnect: true,
				refetchOnMount: true,
			},
		);

	useEffect(() => {
		if (workspaces?.length)
			setWorkspaces(workspaces, workspaceId || workspaces[0]);
		if (workspace && workspaceId) {
			setWorkspace(workspace);
		}
	}, [
		InitialWorkspaces,
		setWorkspaces,
		workspaces,
		workspaceId,
		workspace,
		setWorkspace,
	]);

	useEffect(() => {
		if (user && session) {
			setUserAndSession({ user, session });
		}
	}, [session, user, setUserAndSession]);

	useEffect(() => {
		if (modules?.length) {
			setModules(modules);
		}
		if (module && moduleId) {
			setModulesState({
				module: module,
				moduleLoading: isModuleFetching,
			});
		}
	}, [
		modules,
		setModules,
		module,
		moduleId,
		setModulesState,
		isModuleFetching,
		workspaceId,
	]);

	return children;
};

export default StoreProvider;
