"use client";
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/Logo full.png";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Diamond, Wallet } from "@/components/icons";
import HeaderActionButtons from "./header-action-buttons";

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
	title: React.ComponentProps<any> | string | undefined; // Update the type of title prop to accept React nodes
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<a
					ref={ref}
					className={`group block select-none space-y-1 rounded-md p-3 leading-none text-card-foreground/60 no-underline outline-none transition-colors hover:bg-accent/30 focus:bg-accent focus:text-accent-foreground ${className}`}
					{...props}
				>
					<div className="text-sm font-medium leading-none text-white">
						{title}
					</div>
					<p className="line-clamp-2 text-sm leading-snug text-white/40 group-hover:text-white/70">
						{children}
					</p>
				</a>
			</li>
		);
	},
);

ListItem.displayName = "ListItem";

const Header: React.FC = () => {
	const [path, setPath] = useState<string>("#products");
	return (
		<header
			className={"flex w-full items-center justify-between px-2 py-3"}
		>
			<Link href={"/"}>
				<Image
					src={logoImg}
					alt={"Logo"}
					width={100}
					height={100}
					priority={true}
					quality={1}
					className="h-auto w-full min-w-[120px]"
				/>
			</Link>
			<NavigationMenu
				className={"hidden rounded-[10px] border p-1 md:block"}
			>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger
							onClick={() => setPath("#resources")}
							className={cn({
								"dark:text-white": path === "#resources",
								"dark:text-white/40": path !== "#resources",
								"font-normal": true,
								"md:text-lg": true,
								"h-8 !p-2": true,
							})}
						>
							Getting started
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
								<li className="row-span-3">
									<NavigationMenuLink asChild>
										<a
											className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
											href="/"
										>
											<Image
												src={logoImg}
												alt={"Logo"}
												width={100}
												height={100}
												className="h-auto w-full max-w-[200px]"
											/>
											<div className="mb-2 mt-4 text-lg font-medium">
												Notespace
											</div>
											<p className="text-sm leading-tight text-muted-foreground">
												Beautifully designed,write and
												have notes and documents by
												collaborating with friends and
												colleagues.
											</p>
										</a>
									</NavigationMenuLink>
								</li>
								<ListItem href="/" title="Home">
									A Collaborative Place for you all Your
									Documentation.
								</ListItem>
								<ListItem
									href="/docs/installation"
									title="Get SourceCode"
								>
									How to download and run the code in
									localhost.
								</ListItem>
								<ListItem
									href="https://rohitdev.netlify.app"
									title="Rohit Tiwari (Owner)"
								>
									Rohit Tiwari is developer of this free time
									Web App.
								</ListItem>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href="/" legacyBehavior passHref>
							<NavigationMenuLink
								onClick={() => setPath("#testimonial")}
								className={navigationMenuTriggerStyle({
									className: cn({
										"dark:text-white":
											path === "#testimonial",
										"dark:text-white/40":
											path !== "#testimonial",
										"font-normal": true,
										"md:!text-lg": true,
										"h-8 !p-2": true,
									}),
								})}
							>
								Testimonial
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger
							onClick={() => setPath("#pricing")}
							className={cn({
								"dark:text-white": path === "#pricing",
								"dark:text-white/40": path !== "#pricing",
								"font-normal": true,
								"md:text-lg": true,
								"h-8 !p-2": true,
							})}
						>
							Pricing
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="md:grid-row-2 grid w-[400px] gap-3 p-4">
								<ListItem
									title={
										<div className="flex items-center gap-2">
											<Diamond />
											<span>Pro Plan</span>
										</div>
									}
									href={"#"}
								>
									Unlock full power with collaboration.
								</ListItem>
								<ListItem
									title={
										<div className="flex items-center gap-2">
											<Wallet />
											<span>Pro Plan</span>
										</div>
									}
									href={"#"}
								>
									Great for teams just starting out.
								</ListItem>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
			<div className={"hidden items-center justify-center gap-4 sm:flex"}>
				<HeaderActionButtons />
			</div>
		</header>
	);
};

export default Header;
