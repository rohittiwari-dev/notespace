'use client';
import React, { useMemo, useCallback, useState } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

type BreadcrumbItem = {
	label: string;
	href: string;
	isCurrent: boolean;
	isValidRoute: boolean;
};

type SpaceHeaderProps = {
	workspace?: IWorkSpace;
	// Use Next.js style route patterns
	routePatterns?: string[];
	// Number of crumbs to show at the beginning
	startCrumbs?: number;
	// Number of crumbs to show at the end
	endCrumbs?: number;
	// Whether to use the ellipsis feature
	useEllipsis?: boolean;
};

/**
 * Converts Next.js path pattern to regex for matching
 */
export const patternToRegex = (p: string): RegExp => {
	const r = p
		.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
		.replace(/\\\[\\\[\\\.\\\.\\\.(.*?)\\\]\\\]/g, '(?:\\/.*)?')
		.replace(/\\\[\\\.\\\.\\\.(.*?)\\\]/g, '\\/.*)')
		.replace(/\\\[(.*?)\\\]/g, '([^/]+)');
	return new RegExp(`^${r}$`);
};

/**
 * Checks if a path matches any provided route patterns
 */
export const matchesRoutePattern = (
	path: string,
	currentPath: string,
	patterns?: string[],
): boolean =>
	path === currentPath ||
	!patterns?.length ||
	patterns.some((p) => patternToRegex(p).test(path));

/**
 * Renders a breadcrumb item based on its properties
 */
export const renderBreadcrumbItem = (
	item: BreadcrumbItem,
	handleLinkClick: (
		e: React.MouseEvent,
		href: string,
		valid: boolean,
	) => void,
	inDropdown = false,
) => {
	const dropdownClass = inDropdown ? 'px-1.5 py-1 !text-xs ' : '';

	if (item.isCurrent) {
		return (
			<BreadcrumbPage className="text-secondary-foreground ">
				{item.label}
			</BreadcrumbPage>
		);
	} else if (!item.isValidRoute) {
		return (
			<BreadcrumbPage
				className={`text-muted-foreground ${dropdownClass}`}
				title="This page doesn't exist"
			>
				{item.label}
			</BreadcrumbPage>
		);
	} else {
		return (
			<BreadcrumbLink asChild>
				<Link
					href={item.href}
					prefetch={true}
					onClick={(e) =>
						handleLinkClick(e, item.href, item.isValidRoute)
					}
					className={`hover:opacity-80 transition-opacity ${
						inDropdown
							? `${dropdownClass} block w-full text-left`
							: ''
					}`}
				>
					{item.label}
				</Link>
			</BreadcrumbLink>
		);
	}
};

/**
 * Breadcrumb header component for workspace navigation
 * Supports Next.js style path patterns: static routes, dynamic segments [id],
 * catch-all [...slug], and optional catch-all [[...slug]]
 */
const SpaceHeader = ({
	workspace,
	routePatterns = [],
	startCrumbs = 1,
	endCrumbs = 2,
	useEllipsis = true,
}: SpaceHeaderProps) => {
	const pathname = usePathname();
	const [dropdownOpen, setDropdownOpen] = useState(false);

	// Prevent navigation to invalid routes
	const handleLinkClick = useCallback(
		(e: React.MouseEvent, href: string, valid: boolean) => {
			if (!valid) {
				e.preventDefault();
				e.stopPropagation();
				console.warn(`Navigation prevented to invalid path: ${href}`);
			}
		},
		[],
	);

	// Create and process breadcrumbs
	const { visibleCrumbs, hiddenCrumbs, needsCollapsing } = useMemo(() => {
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
			const href = `/${arr.slice(0, i + 1).join('/')}`;
			let label = segment;

			if (i === 0 && segment === 'space') label = 'Space';
			else if (i === 1 && workspace?.id === segment)
				label = workspace.name;
			else
				label = segment
					.replace(/-/g, ' ')
					.replace(/\b\w/g, (c) => c.toUpperCase());

			acc.push({
				label,
				href,
				isCurrent: href === pathname || `${href}/` === pathname,
				isValidRoute: matchesRoutePattern(
					href,
					pathname,
					routePatterns,
				),
			});
			return acc;
		}, [] as BreadcrumbItem[]);

		// Calculate visible segments
		const totalVisible = startCrumbs + endCrumbs;

		// No need to collapse
		const shouldCollapse = useEllipsis && crumbs.length > totalVisible;
		if (!shouldCollapse)
			return {
				visibleCrumbs: crumbs,
				hiddenCrumbs: [],
				needsCollapsing: false,
			};

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
		useEllipsis,
		startCrumbs,
		endCrumbs,
		workspace?.id,
		workspace?.name,
		routePatterns,
	]);

	return (
		<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
			<div className="flex items-center px-4">
				<SidebarTrigger />
				<Separator orientation="vertical" className="mr-2" />
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
										key={`${item.href}-ellipsis`}
									>
										<BreadcrumbSeparator className="flex items-center mt-0.5 ml-1 justify-center h-full" />
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
													className="py-1 px-0.5 w-full max-w-60"
													align="start"
												>
													<div className="flex !text-[0.5rem] flex-col">
														{hiddenCrumbs
															.filter(
																(item) =>
																	item.isValidRoute,
															)
															.map((item) => (
																<div
																	key={
																		item.href
																	}
																	className="hover:bg-muted !text-[0.5rem] rounded"
																>
																	{renderBreadcrumbItem(
																		item,
																		handleLinkClick,
																		true,
																	)}
																</div>
															))}
													</div>
												</PopoverContent>
											</Popover>
										</BreadcrumbItem>
										<BreadcrumbSeparator className="flex mr-1 mt-0.5 items-center justify-center h-full" />
										<BreadcrumbItem className="flex !items-center !h-full">
											{renderBreadcrumbItem(
												item,
												handleLinkClick,
											)}
										</BreadcrumbItem>
									</React.Fragment>
								);
							}

							// Regular breadcrumb
							return (
								<React.Fragment key={item.href}>
									{index > 0 && (
										<BreadcrumbSeparator className="flex mx-1 mt-0.5 items-center justify-center h-full" />
									)}
									<BreadcrumbItem className="flex !items-center !h-full">
										{renderBreadcrumbItem(
											item,
											handleLinkClick,
										)}
									</BreadcrumbItem>
								</React.Fragment>
							);
						})}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	);
};

export default React.memo(SpaceHeader);
