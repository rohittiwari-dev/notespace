'use client';
import { IWorkSpace } from '@/db/schemas';
import { Session, User } from 'better-auth';
import React from 'react';
import useAppStore from '.';
import trpc from '@/lib/trpc/client';
import { getUrlIds } from '@/lib/utils';
import { usePathname } from 'next/navigation';

function Provider({
	InitialWorkspaces,
	session,
	user,
	children,
}: {
	children: React.ReactNode;
	session: null | Session;
	user: null | User;
	InitialWorkspaces: IWorkSpace[];
}) {
	const pathname = usePathname();
	const { fileId, moduleId, workspaceId } = getUrlIds(pathname);
	const { setWorkspaces, setUserAndSession, setWorkspace } = useAppStore();
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

	React.useEffect(() => {
		if (workspaces) setWorkspaces(workspaces, workspaceId || workspaces[0]);
		if (workspace) {
			setWorkspace(workspace);
		}
		if (user && session) {
			setUserAndSession({ user, session });
		}
	}, [
		InitialWorkspaces,
		session,
		user,
		setWorkspaces,
		setUserAndSession,
		workspaces,
		workspaceId,
		workspace,
		setWorkspace,
	]);

	return children;
}

export default Provider;
