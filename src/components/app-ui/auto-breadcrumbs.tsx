'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IWorkSpace } from '@/db/schemas/schema.types';
import { cn, matchesRoutePattern } from '@/lib/utils';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import useAppStore from '@/store';

type BreadcrumbItem = {
	label: string;
	href: string;
	isCurrent: boolean;
	isValidRoute: boolean;
};

type AutoBreadcrumbsProps = {
	workspace?: IWorkSpace;
	routePatterns?: string[];
	startCrumbs?: number;
	endCrumbs?: number;
	useEllipsis?: boolean;
	color?: string;
	activePageColor?: string;
};

export const RenderBreadcrumbItem = (
	item: BreadcrumbItem,
	inDropdown = false,
	activePageColor?: string,
) => {
	const dropdownClass = inDropdown ? 'px-1.5 py-1 !text-xs ' : '';

	// Even stricter check for invalid URLs
	if (
		!item.isValidRoute ||
		!item.href ||
		item.href.includes('undefined') ||
		item.href.includes('/null/') ||
		item.href.endsWith('/null')
	) {
		return (
			<BreadcrumbPage
				className={`text-muted-foreground ${dropdownClass}`}
				title="This page doesn't exist"
			>
				{item.label}
			</BreadcrumbPage>
		);
	}

	if (item.isCurrent) {
		return (
			<BreadcrumbPage
				className={cn('text-secondary-foreground', activePageColor)}
			>
				{item.label}
			</BreadcrumbPage>
		);
	}

	return (
		<BreadcrumbLink asChild>
			<Link
				href={item.href}
				className={`hover:opacity-80 transition-opacity ${
					inDropdown ? `${dropdownClass} block w-full text-left` : ''
				}`}
			>
				{item.label}
			</Link>
		</BreadcrumbLink>
	);
};

function AutoBreadcrumbs({
	workspace,
	routePatterns = [],
	startCrumbs = 1,
	endCrumbs = 2,
	useEllipsis = true,
	color = 'text-secondary-400/90',
	activePageColor = 'text-secondary-foreground',
}: AutoBreadcrumbsProps) {
	const [mounted, setMounted] = useState(false);
	const pathname = usePathname();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const { module } = useAppStore();

	// Only run client-side to avoid hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	// Create and process breadcrumbs
	const { visibleCrumbs, hiddenCrumbs, needsCollapsing } = useMemo(() => {
		// Important: Return empty state for SSR to avoid hydration mismatch
		if (!mounted) {
			return {
				visibleCrumbs: [],
				hiddenCrumbs: [],
				needsCollapsing: false,
			};
		}

		// Get path segments
		const segments = pathname.replace(/\/$/, '').split('/').filter(Boolean);

		// Handle root path
		if (
			!segments.length ||
			(segments.length === 1 && segments[0] === 'space')
		) {
			const rootCrumb = [
				{
					label: 'Space',
					href: '/space',
					isCurrent: true,
					isValidRoute: true,
				},
			];
			return {
				visibleCrumbs: rootCrumb,
				hiddenCrumbs: [],
				needsCollapsing: false,
			};
		}

		// Build all breadcrumbs
		const crumbs = segments.reduce((acc, segment, i, arr) => {
			// Skip segments that are invalid
			if (segment === 'undefined' || segment === 'null' || !segment) {
				return acc;
			}

			const href = `/${arr.slice(0, i + 1).join('/')}`;
			let label = segment;
			let isValidRoute = true;

			if (i === 0 && segment === 'space') {
				label = 'Space';
			} else if (
				workspace &&
				workspace.id &&
				i === 1 &&
				segment === workspace.id
			) {
				// Only use workspace name if we have a valid workspace ID and it matches the path
				label = workspace.name || 'Workspace';
			} else if (
				i === 1 &&
				segments[0] === 'space' &&
				(!workspace || !workspace.id || segment !== workspace.id)
			) {
				// Handle workspace path segments when workspace is undefined or ID doesn't match
				label = 'Workspace';
				isValidRoute = false; // Mark as invalid route to prevent linking

				acc.push({
					label,
					href,
					isCurrent: href === pathname || `${href}/` === pathname,
					isValidRoute,
				});
				return acc;
			} else if (
				module &&
				module.id &&
				i === 2 &&
				segment === module?.id
			) {
				label = module.name || 'Module';
			} else if (
				i === 2 &&
				segments[0] === 'space' &&
				(!module || !module.id || segment !== module.id)
			) {
				// Handle workspace path segments when workspace is undefined or ID doesn't match
				label = 'Module';
				isValidRoute = false; // Mark as invalid route to prevent linking

				acc.push({
					label,
					href,
					isCurrent: href === pathname || `${href}/` === pathname,
					isValidRoute,
				});
				return acc;
			} else if (
				module?.files?.length &&
				i === 3 &&
				module.files.some((file) => file.id === segment)
			) {
				label =
					module.files.find((file) => file.id === segment)?.name ||
					'File';
			} else if (
				i === 3 &&
				segments[0] === 'space' &&
				(!module?.files?.length ||
					!module.files.some((file) => file.id === segment))
			) {
				// Handle workspace path segments when workspace is undefined or ID doesn't match
				label = 'File';
				isValidRoute = false; // Mark as invalid route to prevent linking

				acc.push({
					label,
					href,
					isCurrent: href === pathname || `${href}/` === pathname,
					isValidRoute,
				});
				return acc;
			} else {
				label = segment
					.replace(/-/g, ' ')
					.replace(/\b\w/g, (c) => c.toUpperCase());
			}

			// Additional safety check for the href
			isValidRoute =
				isValidRoute &&
				!href.includes('undefined') &&
				!href.includes('/null/') &&
				!href.endsWith('/null') &&
				matchesRoutePattern(href, pathname, routePatterns);

			acc.push({
				label,
				href,
				isCurrent: href === pathname || `${href}/` === pathname,
				isValidRoute,
			});
			return acc;
		}, [] as BreadcrumbItem[]);

		// Calculate visible segments
		const totalVisible = startCrumbs + endCrumbs;
		const shouldCollapse = useEllipsis && crumbs.length > totalVisible;

		if (!shouldCollapse) {
			return {
				visibleCrumbs: crumbs,
				hiddenCrumbs: [],
				needsCollapsing: false,
			};
		}

		const visStart = Math.min(startCrumbs, totalVisible - 1);
		const visEnd = Math.min(endCrumbs, totalVisible - visStart);

		// Split breadcrumbs
		const startItems = crumbs.slice(0, visStart);
		const endItems = crumbs.slice(-visEnd);
		const hiddenItems = crumbs.slice(visStart, crumbs.length - visEnd);

		return {
			visibleCrumbs: [...startItems, ...endItems],
			hiddenCrumbs: hiddenItems,
			needsCollapsing: true,
		};
	}, [
		pathname,
		startCrumbs,
		endCrumbs,
		useEllipsis,
		workspace,
		routePatterns,
		mounted,
	]);

	// Don't render anything during SSR
	if (!mounted) {
		return null;
	}

	// Only render on client-side
	return (
		<Breadcrumb>
			<BreadcrumbList className="sm:gap-0 select-none">
				{visibleCrumbs.map((item, index) => {
					// Render ellipsis dropdown
					if (
						index === startCrumbs &&
						needsCollapsing &&
						hiddenCrumbs.length
					) {
						return (
							<React.Fragment
								key={`${item.href || index}-ellipsis`}
							>
								<BreadcrumbSeparator className="flex justify-center items-center mt-0.5 ml-1 h-full" />
								<BreadcrumbItem className="flex !items-center !h-full">
									<Popover
										open={dropdownOpen}
										onOpenChange={setDropdownOpen}
									>
										<PopoverTrigger
											className="cursor-pointer"
											asChild
										>
											<BreadcrumbEllipsis />
										</PopoverTrigger>
										<PopoverContent
											className="px-0.5 py-1 w-full max-w-60"
											align="start"
										>
											<div className="flex flex-col !text-[0.5rem]">
												{hiddenCrumbs
													.filter(
														(item) =>
															item.isValidRoute,
													)
													.map((item, i) => (
														<div
															key={`${item.href || i}-hidden`}
															className="hover:bg-muted rounded !text-[0.5rem]"
														>
															{RenderBreadcrumbItem(
																item,
																true,
																activePageColor,
															)}
														</div>
													))}
											</div>
										</PopoverContent>
									</Popover>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="flex justify-center items-center mt-0.5 mr-1 h-full" />
								<BreadcrumbItem className="flex !items-center !h-full">
									{RenderBreadcrumbItem(
										item,
										false,
										activePageColor,
									)}
								</BreadcrumbItem>
							</React.Fragment>
						);
					}

					// Regular breadcrumb
					return (
						<React.Fragment key={`${item.href || index}-regular`}>
							{index > 0 && (
								<BreadcrumbSeparator
									className={cn(
										'flex justify-center items-center mx-1 mt-0.5 h-full',
										color,
									)}
								/>
							)}
							<BreadcrumbItem
								className={cn(
									'flex !items-center !h-full',
									color,
								)}
							>
								{RenderBreadcrumbItem(
									item,
									false,
									activePageColor,
								)}
							</BreadcrumbItem>
						</React.Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

export default AutoBreadcrumbs;
