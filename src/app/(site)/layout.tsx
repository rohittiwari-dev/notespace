import SiteNavigationHeader from '@/components/site/site-navigation-header';
import React from 'react';
import { Session, User } from 'better-auth';
import { FlickeringGrid } from '@/components/primitives/flickering-grid';
import { getServerSession } from '@/server/actions/auth.actions';

// need net background gradient
const SiteLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getServerSession();
	return (
		<main className="relative h-full w-full z-0">
			<div className="bg-accent-pink/70 absolute -top-30 right-1 -z-10 h-50 w-96 opacity-45 bg-blend-multiply blur-[100px] dark:opacity-30" />
			<div className="bg-accent-orange/70 absolute -top-30 right-80 -z-10 h-50 w-96 opacity-45 bg-blend-multiply blur-[100px] dark:opacity-30" />
			<div className="bg-accent-purple/70 absolute -bottom-30 left-1 -z-10 h-50 w-96 opacity-45 bg-blend-multiply blur-[100px] dark:opacity-30" />
			<FlickeringGrid
				className="absolute top-0 left-0 -z-10 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
				squareSize={3}
				gridGap={14}
				color="#60A5FA"
				maxOpacity={0.5}
				flickerChance={0.1}
			/>
			<div className="relative overflow-y-auto h-full -z-[1] ">
				<div className="h-fit w-full z-[1] text-foreground relative">
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
