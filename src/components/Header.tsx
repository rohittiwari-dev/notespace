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
import { Button, buttonVariants } from "@/components/ui/button";
import { Diamond, Wallet } from "@/components/icons";

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
	title: React.ComponentProps<any> | string | undefined; // Update the type of title prop to accept React nodes
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<a
					ref={ref}
					className={`group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/30 text-card-foreground/60 focus:bg-accent focus:text-accent-foreground ${className}`}
					{...props}
				>
					<div className="font-medium text-sm text-white leading-none">
						{title}
					</div>
					<p className="group-hover:text-white/70 line-clamp-2 text-sm text-white/40 leading-snug">
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
			className={"w-full py-3 px-2 flex  items-center justify-between"}
		>
			<Link href={"/"}>
				<Image
					src={logoImg}
					alt={"Logo"}
					width={100}
					height={100}
					priority={true}
					quality={1}
					className="w-full min-w-[120px] h-auto"
				/>
			</Link>
			<NavigationMenu
				className={"border rounded-[10px] hidden md:block p-1"}
			>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger
							onClick={() => setPath("#resources")}
							className={cn({
								"dark:text-white": path === "#resources",
								"dark:text-white/40": path !== "#resources",
								"font-normal": true,
								"md:text-lg ": true,
								"!p-2 h-8 ": true,
							})}
						>
							Getting started
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="gap-3 grid lg:grid-cols-[.75fr_1fr] p-4 md:w-[400px] lg:w-[500px]">
								<li className="row-span-3">
									<NavigationMenuLink asChild>
										<a
											className="flex flex-col justify-end bg-gradient-to-b from-muted/50 to-muted focus:shadow-md p-6 rounded-md w-full h-full no-underline select-none outline-none"
											href="/"
										>
											<Image
												src={logoImg}
												alt={"Logo"}
												width={100}
												height={100}
												className="w-full max-w-[200px] h-auto"
											/>
											<div className="mt-4 mb-2 font-medium text-lg">
												Notespace
											</div>
											<p className="text-muted-foreground text-sm leading-tight">
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
										"md:!text-lg ": true,
										"!p-2 h-8 ": true,
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
								"md:text-lg ": true,
								"!p-2 h-8 ": true,
							})}
						>
							Pricing
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="gap-3 grid md:grid-row-2 p-4 w-[400px]">
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
			<div className={"sm:flex items-center hidden justify-center gap-4"}>
				<Link
					href={"/login"}
					className={buttonVariants({ variant: "outline" })}
				>
					{" "}
					Login{" "}
				</Link>
				<Link href={"/sign-up "} className={buttonVariants()}>
					{" "}
					Sign Up{" "}
				</Link>
			</div>
		</header>
	);
};

export default Header;
