'use client';
import React from 'react';
import { api } from '@/lib/trpc/client';
import { authClientApi } from '@/lib/auth/client';
import { use } from 'react';

function withSpace(Component: React.ComponentType<any>) {
	const ChildComponent = function ({
		params,
		...props
	}: {
		params: Promise<{ workspaceId: string }>;
		[key: string]: any;
	}) {
		const { workspaceId } = use(params);
		const { data: session } = authClientApi.useSession();
		const { data: workspace, isFetching } =
			api.workspace.getWorkspace.useQuery({
				workspaceId,
			});

		return isFetching ? (
			<div>Loading...</div>
		) : (
			<Component {...props} workspace={workspace} session={session} />
		);
	};

	ChildComponent.displayName = `withSpace(${Component?.displayName || Component?.name || 'Component'})`;
	return ChildComponent;
}

export default withSpace;
