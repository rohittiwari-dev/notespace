import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-gradient-to-br from-primary-400 to-indigo-500 text-white hover:opacity-90 dark:text-primary-50",
				destructive: "bg-red-500 text-white hover:bg-red-400",
				outline:
					"border border-indigo-400  text-slate-400 hover:dark:bg-slate-800 hover:bg-slate-200 hover:text-background hover:dark:text-foreground",
				secondary:
					"bg-primary-300 text-background hover:bg-secondary-300/80 dark:bg-secondary dark:text-foreground dark:hover:bg-secondary/80",
				ghost: "text-foreground hover:bg-primary-100 hover:text-secondary-800  dark:hover:bg-secondary-800 dark:hover:text-foreground",
				link: "relative bg-gradient-to-br dark:from-primary left-0 ring-offset-1 from-violet-500 to-purple-400 bg-clip-text text-transparent before:absolute before:bottom-0 before:h-px before:w-[100%]  before:rounded-full before:bg-gradient-to-br before:from-secondary-500 before:to-purple-400 hover:opacity-90",
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
