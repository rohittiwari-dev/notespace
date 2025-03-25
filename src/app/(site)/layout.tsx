import SiteNavigationHeader from '@/components/site/site-navigation-header';
import React from 'react';
import { authServerApi } from '../../lib/auth/server';
import { headers } from 'next/headers';
import { Session, User } from 'better-auth';
import { DotPattern } from '@/components/primitives/dot-pattern';
import { cn } from '@/lib/utils';

// need net background gradient
const SiteLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await authServerApi.api.getSession({
		headers: await headers(),
	});
	return (
		<main className="relative h-full w-full z-0">
			<div className="bg-accent-pink/70 absolute -top-30 right-1 -z-10 h-50 w-96 opacity-45 bg-blend-multiply blur-[100px] dark:opacity-30" />
			<div className="bg-accent-orange/70 absolute -top-30 right-80 -z-10 h-50 w-96 opacity-45 bg-blend-multiply blur-[100px] dark:opacity-30" />
			<div className="bg-accent-purple/70 absolute -bottom-30 left-1 -z-10 h-50 w-96 opacity-45 bg-blend-multiply blur-[100px] dark:opacity-30" />
			<div className="bg-background/50 overflow-y-auto h-full -z-[1] ">
				<DotPattern
					glow={true}
					className={cn(
						'text-primary-500 z-0',
						'[mask-image:radial-gradient(650px_circle_at_center,var(--background),transparent)]',
					)}
				/>
				<div className="h-fit w-full z-0 relative">
					<SiteNavigationHeader
						session={session?.session as Session}
						user={session?.user as User}
					/>
					{children}
				</div>
			</div>
		</main>
	);
};

export default SiteLayout;
