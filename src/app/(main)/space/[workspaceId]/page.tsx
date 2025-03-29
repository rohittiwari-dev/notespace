import { api } from '@/lib/trpc/server';
import { redirect } from 'next/navigation';
import React from 'react';

async function SpaceWorkspacePage({
	params,
}: {
	params: Promise<{ workspaceId: string }>;
}) {
	const { workspaceId } = await params;
	const workspace = await api.workspace
		.getWorkspace({
			workspaceId,
		})
		.catch(() => {
			redirect('/space');
		});

	return <div>SpaceWorkspacePage : {workspace?.name}</div>;
}

export default SpaceWorkspacePage;
