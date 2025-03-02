import Link from "next/link";
import { Button } from "@/components/ui/button";
import { constants } from "@/lib/local.data";

export default function NotFoundPage() {
	return (
		<main className="bg-background relative h-full w-full">
			<div className="dark:to-background dark:from-primary-800 absolute top-0 left-0 z-0 h-56 w-full bg-gradient-to-b from-transparent to-transparent opacity-70" />
			<div className="container-main z-10 flex min-h-dvh flex-col">
				{/*<Header />*/}
				<div className="container-main mt-8 flex flex-1 flex-col items-center justify-center gap-6">
					<div className="relative">
						<h1 className="text-9xl font-bold text-gray-400">
							404
						</h1>
					</div>
					<h2 className="text-4xl font-medium text-gray-400">
						Oops! Page not found
					</h2>
					<p className="max-w-prose text-center text-lg text-balance text-slate-400">
						It looks like this page has gone on an adventure. Maybe
						it&apos;s hanging out with all those missing socks from
						the laundry.
					</p>
					<div className="flex gap-4">
						<Button asChild size="lg">
							<Link href="/">Return home</Link>
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
