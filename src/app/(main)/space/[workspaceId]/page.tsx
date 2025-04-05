'use client';

import useAppStore from '@/store';

import React from 'react';

function SpaceWorkspacePage() {
	const { state } = useAppStore();

	return (
		<div>
			SpaceWorkspacePage : {state?.workspace?.selectedWorkspace?.name}
		</div>
	);
}

export default SpaceWorkspacePage;
