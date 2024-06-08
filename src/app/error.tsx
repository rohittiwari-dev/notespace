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
		<div className="relative z-0 flex justify-center items-center p-4 w-screen h-screen min-h-screen text-gray-300">
			<div className="-z-10 absolute bg-brand-dark bg-gradient-to-t from-[38%] from-indigo-600/80 to-[30%] to-purple-700/80 blur-[20vw] w-[40vw] h-[40vw]" />
			<div className="flex flex-col justify-center items-center p-6 w-full text-center">
				<div className="w-fit text-center">
					<h1 className="font-bold text-3xl text-red-500/80">
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
				<div className="flex justify-center mt-6">
					<Button onClick={reset}>Try again</Button>
				</div>
			</div>
		</div>
	);
}
