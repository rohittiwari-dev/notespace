'use client';

import * as React from 'react';
import { LucideIcon } from 'lucide-react';

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import TrashPopUpComponent from '../trash-component-popup';

export function NavSecondary({
	items,
	dropdownContentAlign = 'bottom',
	...props
}: {
	dropdownContentAlign?: 'bottom' | 'right' | 'top' | 'left' | undefined;
	items: {
		title: string;
		url: string;
		icon: LucideIcon;
		id: string | number;
	}[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) =>
						item.id === '2' || item.id === 2 ? (
							<TrashPopUpComponent
								key={item.title}
								dropdownContentAlign={dropdownContentAlign}
							>
								<SidebarMenuItem>
									<SidebarMenuButton className="cursor-pointer">
										<item.icon />
										<span>{item.title}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</TrashPopUpComponent>
						) : (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton asChild>
									<Link href={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						),
					)}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
