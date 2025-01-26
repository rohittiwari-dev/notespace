import { GlowEffect } from "@/components/core/glow-effect";
import { ComponentProps } from "react";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

export function GlowedButton({
	children,
	className,
	...props
}: { children: ComponentProps<any> } & ButtonProps) {
	return (
		<div className="relative">
			<GlowEffect
				colors={["#FF5733", "#33FF57", "#3357FF", "#F1C40F"]}
				mode="colorShift"
				blur="soft"
				duration={3}
				scale={0.95}
			/>
			<Button
				className={cn("relative inline-flex cursor-pointer", className)}
				{...props}
			>
				{children}
			</Button>
		</div>
	);
}
