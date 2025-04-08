'use client';
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from 'lucide-react';
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
import { cn, getInitialsFromName } from '@/lib/utils';
import { authClientApi } from '@/lib/auth/client';
import { redirect } from 'next/navigation';
import Spinner from '@/components/app-ui/spinner';
import Link from 'next/link';
import { SidebarMenuButton } from '../ui/sidebar';
import { resetStore } from '@/store';

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
							resetStore();
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
							'w-fit rounded-full p-0.5 h-fit hover:bg-accent/90',
					)}
				>
					<Avatar
						className={cn(
							'w-[2.2rem] h-[2.2rem]',
							variant === 'sidebar' && 'rounded-lg',
						)}
						fallbackClassName={cn(
							'w-[2.2rem] h-[2.2rem]',
							variant === 'sidebar' && 'rounded-lg',
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
