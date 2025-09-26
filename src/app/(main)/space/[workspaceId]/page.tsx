'use client';
import ModuleCard from '@/components/workspace/modules/module-card';
import { FullPageCard } from '@/components/workspace/modules/page-card';
import trpc from '@/lib/trpc/client';
import useAppStore from '@/store';
import { IconFolder, IconNotebook } from '@tabler/icons-react';

import React from 'react';

function SpaceWorkspacePage() {
	const { workspace, user, modules } = useAppStore();
	const { data: recentFiles } = trpc.files.getRecentFiles.useQuery(
		{ workspaceId: workspace?.id || '' },
		{ staleTime: 1000 * 60 * 5 },
	);

	return (
		<div>
			<h1 className="flex items-center gap-2 px-4 font-light text-primary-300 text-lg">
				Welcome back {user?.name} to {workspace?.name} 👋
			</h1>
			<h1 className="flex items-center gap-2 mt-4 px-4 font-medium text-secondary-300 text-sm">
				<IconFolder className="size-5" />
				My Modules
			</h1>
			<div className="flex flex-wrap gap-8 p-4">
				{modules.map((item, idx) => (
					<ModuleCard module={item} key={idx + item.name} />
				))}
			</div>
			<h1 className="flex items-center gap-2 mt-4 px-4 font-medium text-secondary-300 text-sm">
				<IconNotebook className="size-5" />
				My Recent Notes
			</h1>
			<div className="flex flex-wrap gap-8 p-4">
				{recentFiles?.map((item, idx) => (
					<FullPageCard page={item} key={idx + item.name} />
				))}
			</div>
		</div>
	);
}

export default SpaceWorkspacePage;
