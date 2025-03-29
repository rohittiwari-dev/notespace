'use client';
import React, { forwardRef, useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import SmallLogo from '@/assets/Logo_Small.png';
import ThemeSwitcher from '../app-ui/theme-switcher';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import { cn } from '@/lib/utils';
import { constants, features } from '@/lib/constants';
import { ChevronRightIcon, MenuIcon } from 'lucide-react';
import { Session, User } from 'better-auth';

const ListItem = forwardRef<
	React.ComponentRef<'div'>,
	React.ComponentPropsWithoutRef<'div'> & { icon: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<div
					ref={ref}
					className={cn(
						'dark:hover:border-border hover:bg-primary-200/20 hover:border-primary-900/20 dark:hover:bg-secondary-700/60 dark:hover:text-foreground dark:focus:border-primary-900 dark:focus:bg-secondary-700/40 dark:focus:text-primary-700 z-50 flex cursor-pointer items-start gap-3 rounded-md border border-transparent px-4 py-3 leading-none no-underline transition-colors outline-none select-none',
						className,
					)}
					{...props}
				>
					<div className="size-[18px]">{icon}</div>
					<div className="space-y-2">
						<div className="text-foreground text-sm leading-none font-medium">
							{title}
						</div>
						<p className="line-clamp-2 text-xs leading-normal">
							{children}
						</p>
					</div>
				</div>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = 'ListItem';

const SiteNavigationHeader = ({
	user,
	session,
}: {
	session?: Session;
	user?: User;
}) => {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className={cn('z-50 w-full pt-4 pb-0 md:py-4 container')}>
			<div className="container-main flex items-center justify-between transition-all">
				<Link href="/" className="flex items-center gap-3">
					<Image
						src={SmallLogo}
						width={35}
						height={35}
						alt="Noodle Logo"
					/>
					<span>{constants.shortName}</span>
				</Link>
				<nav className="">
					<NavigationMenu className="hidden md:block border border-accent-purple/50 bg-accent-purple/5 rounded-full">
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="!bg-transparent hover:!bg-transparent hover:!text-accent-purple">
									Features
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<div className="absolute top-1/2 right-36 z-30 size-20 -translate-y-1/2 rounded-full bg-pink-400 opacity-90 blur-3xl dark:opacity-50" />
									<ul className="grid gap-3 p-3 md:w-[450px] lg:w-[550px] lg:grid-cols-[1fr_0.85fr]">
										<div className="flex flex-col gap-3">
											{features(18).map((feature) => (
												<ListItem
													key={feature.title}
													title={feature.title}
													icon={feature.icon}
												>
													{feature.description}
												</ListItem>
											))}
										</div>
										<li>
											<NavigationMenuLink asChild>
												<div className="bg-transparent hover:bg-primary-200/40 dark:hover:bg-secondary-800/75 dark:border-primary-700 dark:bg-primary-800/50 flex size-full cursor-pointer flex-col justify-end rounded-md border px-6 py-3 pt-6 no-underline backdrop-blur-lg transition-colors outline-none select-none focus:shadow-md">
													<Image
														src={SmallLogo}
														width={35}
														height={35}
														alt="Noodle Logo"
													/>
													<div className="text-foreground mt-4 mb-2 text-lg font-medium">
														{constants.shortName}
													</div>
													<p className="text-secondary-50 text-sm leading-snug">
														Helping students stay
														productive and on top of
														their work.
													</p>

													<a
														href={
															constants.github_repo
														}
														target="_blank"
														rel="noreferrer noopener"
														className="hover:text-foreground mt-6 flex items-center gap-2 py-2 text-sm transition-colors"
													>
														Contribute{' '}
														<ChevronRightIcon
															size={13}
														/>
													</a>
												</div>
											</NavigationMenuLink>
										</li>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link href="/blog" legacyBehavior passHref>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle({
											className:
												'bg-transparent hover:bg-transparent hover:text-accent-purple',
										})}
									>
										Blog
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink
									href={constants.github_repo}
									target="_blank"
									rel="noreferrer noopener"
									className={navigationMenuTriggerStyle({
										className:
											'bg-transparent hover:bg-transparent hover:text-accent-purple',
									})}
								>
									Contribute
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink
									href={constants.discord}
									target="_blank"
									rel="noreferrer noopener"
									className={navigationMenuTriggerStyle({
										className:
											'bg-transparent hover:bg-transparent hover:text-accent-purple',
									})}
								>
									Discord
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</nav>
				<div className="hidden items-center gap-4 md:flex">
					{!session && !user ? (
						<>
							<Button asChild size="sm" variant="ghost">
								<Link href="/sign-in">Signin</Link>
							</Button>
							<Button asChild size="sm">
								<Link href="/sign-up">Signup</Link>
							</Button>
						</>
					) : (
						<Button asChild size="sm">
							<Link href="/sign-in">
								Space <ChevronRightIcon size={16} />
							</Link>
						</Button>
					)}

					<ThemeSwitcher />
				</div>
				<div className="block md:hidden">
					<button
						type="button"
						onClick={() => {
							setMenuOpen((prev) => !prev);
						}}
					>
						<MenuIcon size={24} />
					</button>
				</div>
			</div>
			<div
				className={cn(
					'block h-0 overflow-hidden md:hidden',
					menuOpen && 'h-full pt-6',
				)}
			>
				<div className="container-main">
					<ul className="flex flex-col gap-3">
						<li>
							<Link href="/early-access">Early access</Link>
						</li>
						<li>
							<Link href="/blog">Blog</Link>
						</li>
						<li>
							<a
								href={constants.github_repo}
								target="_blank"
								rel="noreferrer noopener"
							>
								Contribute
							</a>
						</li>
						<li>
							<a
								href={constants.discord}
								target="_blank"
								rel="noreferrer noopener"
							>
								Discord
							</a>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
};

export default SiteNavigationHeader;
