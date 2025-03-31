import { constants } from '@/lib/constants';
import React from 'react';
import AutoBreadcrumbs from '../app-ui/auto-breadcrumbs';
import { IWorkSpace } from '@/db/schemas/schema.types';
import { cn } from '@/lib/utils';

function SpaceFooter({
	breadcrumbsLocation = 'inline-right',
	breadcrumbEnabled = true,
	breadcrumbsActivePaths,
	workspace,
}: {
	breadcrumbsLocation?: 'inline-right' | 'inline-left';
	breadcrumbEnabled?: boolean;
	breadcrumbsActivePaths?: string[];
	workspace?: IWorkSpace;
}) {
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
					workspace={workspace}
				/>
			)}
		</footer>
	);
}

export default SpaceFooter;
