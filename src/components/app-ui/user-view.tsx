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
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import React, { useState } from 'react';
import Avatar from '@/components/app-ui/avatar';
import { getInitialsFromName } from '@/utils';
import { authClientApi } from '@/lib/auth/client';
import { redirect } from 'next/navigation';
import Spinner from '@/components/app-ui/spinner';

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

function UserView({
	email,
	avatar,
	name,
}: {
	name: string;
	email: string;
	avatar: string;
}) {
	const { isMobile } = useSidebar();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar
								className="h-8 w-8 rounded-lg"
								fallbackClassName="rounded-lg h-8 w-8"
								href={avatar}
								alt={name}
								initial={getInitialsFromName(name)}
							/>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{name}
								</span>
								<span className="truncate text-xs">
									{email}
								</span>
							</div>
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? 'bottom' : 'right'}
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
									<span className="truncate text-xs">
										{email}
									</span>
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
							<DropdownMenuItem className="hover:!bg-accent/30 cursor-pointer">
								<BadgeCheck />
								Account
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
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

export default UserView;
