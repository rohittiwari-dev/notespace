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
	const { moduleId, workspaceId } = getUrlIds(pathname);
	const {
		setWorkspaces,
		setUserAndSession,
		setModulesState,
		setWorkspace,
		setModules,
		setWorkspaceState,
		setModule,
	} = useAppStore();

	const {
		data: workspaces,
		isLoading: isWorkspacesLoading,
		isFetching: isWorkspacesFetching,
	} = trpc.workspace.getWorkspaces.useQuery(
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
	const {
		data: workspace,
		isFetching: isWorkspaceFetching,
		isLoading: isWorkspaceLoading,
	} = trpc.workspace.getWorkspace.useQuery(
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
	const {
		data: modules,
		isLoading: isModulesLoading,
		isFetching: isModulesFetching,
	} = trpc.modules.getModules.useQuery(
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
	const {
		data: module,
		isFetching: isModuleFetching,
		isLoading: isModuleLoading,
	} = trpc.modules.getModule.useQuery(
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
		setWorkspaceState({
			workspaceLoading: isWorkspaceFetching || isWorkspaceLoading,
			workspacesLoading: isWorkspacesLoading || isWorkspacesFetching,
		});
	}, [
		InitialWorkspaces,
		setWorkspaces,
		workspaces,
		workspaceId,
		setWorkspaceState,
		workspace,
		isWorkspaceFetching,
		isWorkspaceLoading,
		isWorkspacesLoading,
		isWorkspacesFetching,
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
			});
		}
		setModulesState({
			moduleLoading: isModuleFetching || isModuleLoading,
			modulesLoading: isModulesLoading || isModulesFetching,
		});
		if (moduleId && !module) {
			setModule(moduleId);
		}
	}, [
		modules,
		setModule,
		setModules,
		module,
		moduleId,
		setModulesState,
		isModuleFetching,
		isModuleLoading,
		isModulesLoading,
		isModulesFetching,
		workspaceId,
	]);

	console.log(
		'StoreProvider rendered',
		module,
		modules,
		workspace,
		workspaces,
	);
	return children;
};

export default StoreProvider;
