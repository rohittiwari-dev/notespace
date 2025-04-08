'use client';
import { constants } from '@/lib/constants';
import React from 'react';

import { cn } from '@/lib/utils';
import useAppStore from '@/store';
import dynamic from 'next/dynamic';

// Import AutoBreadcrumbs with ssr: false to only render on client
const AutoBreadcrumbs = dynamic(() => import('../app-ui/auto-breadcrumbs'), {
	ssr: false,
});

function SpaceFooter({
	breadcrumbsLocation = 'inline-right',
	breadcrumbEnabled = true,
	breadcrumbsActivePaths,
}: {
	breadcrumbsLocation?: 'inline-right' | 'inline-left';
	breadcrumbEnabled?: boolean;
	breadcrumbsActivePaths?: string[];
}) {
	const { workspace } = useAppStore();
	return (
		<footer
			className={cn(
				'flex w-full px-4 justify-between items-center shrink-0 gap-1 pb-2 transition-[width,height] ease-linear',
				breadcrumbEnabled &&
					breadcrumbsLocation === 'inline-left' &&
					'flex-row-reverse',
				breadcrumbEnabled && 'items-end',
			)}
		>
			<div
				className={cn(
					'space-y-1',
					breadcrumbEnabled &&
						breadcrumbsLocation === 'inline-left' &&
						'text-right',
				)}
			>
				<p className="text-sm text-secondary-400/90">
					All rights reserved
				</p>
				<p className="text-sm text-secondary-400/90">
					&copy; {new Date().getFullYear()} {constants.name}
				</p>
			</div>
			{breadcrumbEnabled && (
				<AutoBreadcrumbs
					color="text-secondary-400/90"
					activePageColor="text-muted-foreground"
					routePatterns={breadcrumbsActivePaths}
					workspace={workspace ?? undefined}
				/>
			)}
		</footer>
	);
}

export default SpaceFooter;
