import React from 'react';
import { cn } from '@/lib/utils';
import AutoBreadcrumbs from './auto-breadcrumbs';
import { IWorkSpace } from '@/db/schemas/schema.types';

function PageTitle({
	title,
	description,
	className,
	titleClassName,
	descriptionClassName,
	descriptionColor,
	breadcrumbEnabled,
	breadcrumbsActivePaths,
	breadcrumbsLocation = 'inline-right',
	workspace,
}: {
	title: string;
	description?: string;
	className?: string;
	titleClassName?: string;
	descriptionClassName?: string;
	descriptionColor?: string;
	breadcrumbEnabled?: boolean;
	breadcrumbsActivePaths?: string[];
	breadcrumbsLocation?:
		| 'top-title'
		| 'bottom-description'
		| 'inline-right'
		| 'inline-left';
	workspace?: IWorkSpace;
}) {
	return (
		<div className={cn('flex flex-col gap-1', className)}>
			{breadcrumbEnabled && breadcrumbsLocation === 'top-title' && (
				<AutoBreadcrumbs
					routePatterns={breadcrumbsActivePaths}
					workspace={workspace}
				/>
			)}
			<div
				className={cn(
					'flex items-center gap-1',
					breadcrumbEnabled && 'justify-between items-start',
				)}
			>
				{breadcrumbEnabled && breadcrumbsLocation === 'inline-left' && (
					<AutoBreadcrumbs
						routePatterns={breadcrumbsActivePaths}
						workspace={workspace}
					/>
				)}
				<div
					className={cn(
						breadcrumbEnabled &&
							breadcrumbsLocation === 'inline-left' &&
							'text-right',
					)}
				>
					<h1
						className={cn(
							'text-lg text-secondary-400/90 font-medium',
							titleClassName,
						)}
					>
						{title}
					</h1>
					{description && (
						<p
							className={cn(
								'text-sm text-secondary-400/90',
								descriptionClassName,
							)}
							style={{ color: descriptionColor }}
						>
							{description}
						</p>
					)}
				</div>
				{breadcrumbEnabled &&
					breadcrumbsLocation === 'inline-right' && (
						<AutoBreadcrumbs
							routePatterns={breadcrumbsActivePaths}
							workspace={workspace}
						/>
					)}
			</div>
			{breadcrumbEnabled &&
				breadcrumbsLocation === 'bottom-description' && (
					<AutoBreadcrumbs
						routePatterns={breadcrumbsActivePaths}
						workspace={workspace}
					/>
				)}
		</div>
	);
}

export default PageTitle;
