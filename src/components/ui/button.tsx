import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"bg-gradient-to-br from-primary-400 to-indigo-500 text-white hover:opacity-90 dark:text-primary-50",
				destructive: "bg-red-500 text-white hover:bg-red-400",
				outline:
					"border border-indigo-400  text-slate-400 hover:bg-slate-800 hover:text-foreground",
				secondary: "bg-secondary text-foreground hover:bg-secondary/80",
				ghost: "text-foreground hover:bg-secondary-800 hover:text-foreground",
				link: "relative bg-gradient-to-br from-primary left-0 ring-offset-1 to-purple-400 bg-clip-text text-transparent before:absolute before:bottom-0 before:h-px before:w-[100%]  before:rounded-full before:bg-gradient-to-br before:from-secondary-500 before:to-purple-400 hover:opacity-90",
			},
			size: {
				default: "px-4 py-2",
				sm: "px-3 py-1.5",
				lg: "px-3 py-1.5 lg:px-4 lg:py-2 lg:text-base",
				icon: "size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
