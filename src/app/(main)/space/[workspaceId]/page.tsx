'use client';

import useAppStore from '@/store';

import React from 'react';

function SpaceWorkspacePage() {
	const { workspace } = useAppStore();

	return <div>SpaceWorkspacePage : {workspace?.name}</div>;
}

export default SpaceWorkspacePage;
