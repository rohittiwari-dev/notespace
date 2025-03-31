'use client';
import {
	BadgeCheck,
	Bell,
	CreditCard,
	LogOut,
	Sparkles,
	Users2,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import React, { useState } from 'react';
import Avatar from '@/components/app-ui/avatar';
import { getInitialsFromName } from '@/lib/utils';
import { authClientApi } from '@/lib/auth/client';
import { redirect } from 'next/navigation';
import Spinner from '@/components/app-ui/spinner';
import Link from 'next/link';
import { cn } from '@/lib/utils';

import { SidebarMenuButton } from '../ui/sidebar';

const LogoutMenuItem = () => {
	const [loading, setLoading] = useState(false);
	return (
		<DropdownMenuItem
			onClick={async () => {
				setLoading(true);
				await authClientApi.signOut({
					fetchOptions: {
						onRequest: () => {
							setLoading(true);
						},
						onSuccess: () => {
							setLoading(false);
							redirect('/sign-in');
						},
						onError: () => {
							setLoading(false);
						},
					},
				});
			}}
			className="hover:!bg-accent/30 cursor-pointer"
		>
			{loading ? (
				<Spinner className="!text-primary-200/60" />
			) : (
				<LogOut />
			)}
			Log out
		</DropdownMenuItem>
	);
};

function UserButton({
	email,
	avatar,
	name,
	variant = 'sidebar',
	dropdownContentAlign = 'bottom',
}: {
	name: string;
	email: string;
	avatar: string;
	variant?: 'sidebar' | 'header';
	dropdownContentAlign?: 'bottom' | 'right' | 'top' | 'left' | undefined;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="px-1">
				<SidebarMenuButton
					size="lg"
					// variant={variant === 'header' ? 'outline' : 'ghost'}
					className={cn(
						'data-[state=open]:bg-sidebar-accent px-2 w-full select-none cursor-pointer data-[state=open]:text-sidebar-accent-foreground',
						variant === 'header' &&
							'w-fit rounded-full p-0.5 h-fit',
					)}
				>
					<Avatar
						className={cn(
							'h-7 w-7',
							variant === 'sidebar' && 'rounded-lg w-8 h-8',
						)}
						fallbackClassName={cn(
							'h-7 w-7',
							variant === 'sidebar' && 'rounded-lg w-8 h-8',
						)}
						href={avatar}
						alt={name}
						initial={getInitialsFromName(name)}
					/>
					{variant === 'sidebar' && (
						<>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{name}
								</span>
								<span className="truncate text-xs">
									{email}
								</span>
							</div>
						</>
					)}
				</SidebarMenuButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
				side={dropdownContentAlign}
				align="end"
				sideOffset={4}
			>
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar
							className="h-8 w-8 rounded-lg"
							fallbackClassName="rounded-lg"
							href={avatar}
							alt={name}
							initial={getInitialsFromName(name)}
						/>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">
								{name}
							</span>
							<span className="truncate text-xs">{email}</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="hover:!bg-accent/30 cursor-pointer">
						<Sparkles />
						Upgrade to Pro
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="hover:!bg-accent/30 cursor-pointer"
						asChild
					>
						<Link href="/accounts">
							<BadgeCheck />
							Account
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="hover:!bg-accent/30 cursor-pointer">
						<Users2 />
						Collaborators
					</DropdownMenuItem>
					<DropdownMenuItem className="hover:!bg-accent/30 cursor-pointer">
						<CreditCard />
						Billing
					</DropdownMenuItem>
					<DropdownMenuItem className="hover:!bg-accent/30 cursor-pointer">
						<Bell />
						Notifications
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<LogoutMenuItem />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default UserButton;
