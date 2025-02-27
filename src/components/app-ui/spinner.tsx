import React, { SVGProps } from "react";
import { cn } from "@/lib/utils";

const Spinner = ({
	className,
	loadingLabel,
	textClassName,
	...props
}: SVGProps<SVGSVGElement> & {
	loadingLabel?: string | React.ReactNode;
	textClassName?: string;
}) => (
	<>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			className={cn(
				"text-foreground h-6 w-6 animate-spin duration-500",
				className,
			)}
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path d="M21 12a9 9 0 1 1-6.219-8.56" />
		</svg>{" "}
		{loadingLabel &&
			(typeof loadingLabel === "string" ? (
				<span className={cn("text-base", textClassName)}>
					{loadingLabel}
				</span>
			) : (
				loadingLabel
			))}
	</>
);

export default Spinner;
