import trpc, { HydrateClient } from '@/lib/trpc/server';
import { getServerSession } from '@/server/actions/auth.actions';
import { StoreProvider } from '@/store';
import { redirect } from 'next/navigation';
import React from 'react';

const SpaceLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getServerSession();
	const workspaces = await trpc.workspace.getWorkspaces({
		userId: session?.user?.id ?? '',
	});

	if (!workspaces?.length) {
		redirect('/space');
	}

	return (
		<main className="bg-background relative z-0 h-full w-full overflow-hidden">
			<div className="bg-accent-pink/70 absolute -top-30 right-1 -z-10 h-50 w-96 opacity-45 bg-blend-multiply blur-[100px] dark:opacity-30" />
			<div className="bg-accent-orange/70 absolute -top-30 right-80 -z-10 h-50 w-96 opacity-45 bg-blend-multiply blur-[100px] dark:opacity-30" />
			<div className="bg-accent-purple/70 absolute -bottom-30 left-1 -z-10 h-50 w-96 opacity-45 bg-blend-multiply blur-[100px] dark:opacity-30" />
			<div className="bg-background/40 z-50 h-full w-full overflow-y-auto backdrop-blur-2xl">
				<StoreProvider
					session={session?.session || null}
					user={session?.user || null}
					InitialWorkspaces={workspaces}
				>
					<HydrateClient>{children}</HydrateClient>
				</StoreProvider>
			</div>
		</main>
	);
};

export default SpaceLayout;
