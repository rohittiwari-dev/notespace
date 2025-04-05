'use client';
import React, { use, useEffect } from 'react';

import useAppStore from '@/store';

function withSpace(Component: React.ComponentType<any>) {
	const ChildComponent = function ({
		params,
		...props
	}: {
		params: Promise<{ workspaceId: string }>;
		[key: string]: any;
	}) {
		const { workspaceId } = use(params);
		const {
			setSelectedWorkspace,
			state: {
				session,
				user,
				workspace: { selectedWorkspace: workspace },
			},
		} = useAppStore();

		useEffect(() => {
			setSelectedWorkspace(workspaceId);
		}, [setSelectedWorkspace, workspaceId]);

		return (
			<Component
				{...props}
				workspace={workspace}
				session={{ session, user }}
			/>
		);
	};

	ChildComponent.displayName = `withSpace(${Component?.displayName || Component?.name || 'Component'})`;
	return ChildComponent;
}

export default withSpace;
