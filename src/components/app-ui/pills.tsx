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
				"flex h-fit rounded-full p-[1px] text-center",
				"items-stretch justify-stretch dark:bg-gradient-to-r dark:from-brand-primaryBlue",
				"dark:to-brand-primaryPurple",
				variant === "SQUARE" && "rounded-[3px]",
				variant === "SQUARICLE" && "rounded-lg",
			)}
		>
			<div
				className={cn(
					"h-full w-full min-w-[130px] rounded-full bg-brand-dark p-1 px-2",
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
