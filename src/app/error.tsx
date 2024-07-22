"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="relative z-0 flex h-screen min-h-screen w-screen items-center justify-center p-4 text-gray-300">
			<div className="absolute -z-10 h-[40vw] w-[40vw] bg-brand-dark bg-gradient-to-t from-indigo-600/80 from-[38%] to-purple-700/80 to-[30%] blur-[20vw]" />
			<div className="flex w-full flex-col items-center justify-center p-6 text-center">
				<div className="w-fit text-center">
					<h1 className="text-3xl font-bold text-red-500/80">
						Something Went Wrong
					</h1>
					<p className="mt-4 text-washed-blue-500">
						We encountered an unexpected
						{" " + error.name + ""} error. Please try again.
					</p>
					<p className="mt-2 text-washed-blue-500">
						Message : {error.message}
					</p>
				</div>
				<div className="mt-6 flex justify-center">
					<Button onClick={reset}>Try again</Button>
				</div>
			</div>
		</div>
	);
}
