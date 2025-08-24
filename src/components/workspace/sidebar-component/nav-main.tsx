'use client';

import { type LucideIcon } from 'lucide-react';

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import TrashPopUpComponent from '../trash-component-popup';

export function NavMain({
	items,
	dropdownContentAlign = 'bottom',
}: {
	items: {
		title: string;
		url: string;
		icon: LucideIcon;
		id: string | number;
	}[];
	dropdownContentAlign?: 'bottom' | 'right' | 'top' | 'left' | undefined;
}) {
	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2">
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
								<SidebarMenuButton
									tooltip={item.title}
									className="cursor-pointer"
									asChild
								>
									<Link href={item.url}>
										{item.icon && <item.icon />}
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
