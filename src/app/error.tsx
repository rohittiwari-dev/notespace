'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';
import { constants } from '@/lib/constants';

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<main className="bg-background relative h-full w-full">
			<div className="dark:to-background dark:from-primary-800 absolute top-0 left-0 z-0 h-56 w-full bg-gradient-to-b from-transparent to-transparent opacity-70" />
			<div className="container-main z-10 flex min-h-dvh flex-col">
				{/*<Header />*/}
				<div className="container-main mt-8 flex flex-1 flex-col items-center justify-center gap-6">
					<div className="relative">
						<h1 className="text-9xl font-bold text-gray-400">
							505
						</h1>
					</div>
					<h2 className="text-4xl font-medium text-gray-400">
						Oops! {error.name}
					</h2>
					<p className="max-w-prose text-center text-lg text-balance text-slate-400">
						<span>Client Side Error</span>
						{error.message}
					</p>
					<div className="flex gap-4">
						<Button size="lg" onClick={reset}>
							Refresh
						</Button>
						<Button asChild size="lg" variant="outline">
							<a
								href={constants.support}
								target="_blank"
								rel="noopener noreferrer"
							>
								Contact support
							</a>
						</Button>
					</div>
				</div>
				{/*<Footer />*/}
			</div>
		</main>
	);
}
