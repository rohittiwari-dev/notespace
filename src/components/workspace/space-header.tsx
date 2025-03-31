'use client';
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import UserButton from '../app-ui/user-button';
import { User } from 'better-auth';
import ThemeSwitcher from '../app-ui/theme-switcher';

/**
 * Breadcrumb header component for workspace navigation
 * Supports Next.js style path patterns: static routes, dynamic segments [id],
 * catch-all [...slug], and optional catch-all [[...slug]]
 *
 *  group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 h-16
 */
const SpaceHeader = ({ user }: { user: User }) => {
	return (
		<header className="flex w-full px-4 flex-col shrink-0 gap-1 transition-[width,height] ease-linear">
			<div className="flex py-2 items-center w-full gap-2">
				<SidebarTrigger />
				<div className="flex-1" />
				<ThemeSwitcher />
				<UserButton
					name={user.name ?? ''}
					email={user.email ?? ''}
					avatar={user.image ?? ''}
					variant="header"
				/>
			</div>
		</header>
	);
};

export default React.memo(SpaceHeader);
