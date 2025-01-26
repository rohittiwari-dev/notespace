import { cn } from "@/lib/utils";

function Skeleton({
	className,
	noPulse = false,
	...props
}: React.HTMLAttributes<HTMLDivElement> & { noPulse?: boolean }) {
	return (
		<div
			className={cn(
				"bg-gray-element animate-pulse rounded-md",
				noPulse && "animate-none",
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };
