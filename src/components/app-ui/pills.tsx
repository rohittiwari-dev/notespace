import React from "react";
import { cn } from "@/lib/utils";

interface IPills {
	children: React.ComponentProps<any>;
	variant?: "SQUARE" | "SQUARICLE" | "ROUNDED";
}

const Pills: React.FC<IPills> = ({ children, variant = "ROUNDED" }) => {
	return (
		<article
			className={cn(
				"flex h-fit items-center justify-center rounded-full p-[1.5px] text-center select-none",
				"dark:bg-gradient-to-r dark:from-indigo-500",
				"dark:to-violet-500",
				variant === "SQUARE" && "rounded-[3px]",
				variant === "SQUARICLE" && "rounded-lg",
			)}
		>
			<div
				className={cn(
					"bg-background/80 h-full w-full min-w-[130px] rounded-full p-1.5 px-3 text-sm",
					variant === "SQUARE" && "rounded-[3px]",
					variant === "SQUARICLE" && "rounded-lg",
				)}
			>
				{children}
			</div>
		</article>
	);
};

export default Pills;
