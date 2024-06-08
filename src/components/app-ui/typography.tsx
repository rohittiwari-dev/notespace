import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export const H1 = ({ className, children, ...props }: ComponentProps<"h1">) => {
	return (
		<h1 className={cn("text-[45px] md:text-[65px] font-bold", className)}>
			{children}
		</h1>
	);
};
export const H2 = ({ className, children, ...props }: ComponentProps<"h1">) => {
	return (
		<h2
			className={cn(
				"md:text-[55px] md:font-medium text-[35px] font-bold",
				className,
			)}
		>
			{children}
		</h2>
	);
};
export const H3 = ({ className, children, ...props }: ComponentProps<"h1">) => {
	return (
		<h3 className={cn("text-[25px] font-bold md:text-[45px]", className)}>
			{children}
		</h3>
	);
};
export const H4 = ({ className, children, ...props }: ComponentProps<"h1">) => {
	return (
		<h4 className={cn("text-lg font-medium md:text-[35px]", className)}>
			{children}
		</h4>
	);
};
export const H5 = ({ className, children, ...props }: ComponentProps<"h1">) => {
	return (
		<h5
			className={cn(
				"text-base md:text-2xl font-medium md:font-normal",
				className,
			)}
		>
			{children}
		</h5>
	);
};
export const P = ({ className, children, ...props }: ComponentProps<"h1">) => {
	return <p className={cn("text-base", className)}>{children}</p>;
};
