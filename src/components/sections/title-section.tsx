import React from "react";
import Pills from "../app-ui/pills";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TitleSectionPropWithPillTypeNone {
	subheading?: string;
	heading: string;
	pill?: string;
	headingClass?: string;
	paragraphClass?: string;
	containerClassName?: string;
	pillVariant?: "SQUARE" | "SQUARICLE" | "ROUNDED";
	pillType?: "NONE";
}

interface TitleSectionPropWithPillTypeLink {
	subheading?: string;
	heading: string;
	pill?: string;
	headingClass?: string;
	paragraphClass?: string;
	containerClassName?: string;
	pillVariant?: "SQUARE" | "SQUARICLE" | "ROUNDED";
	pillType?: "LINK";
	href: string;
}
type TitleSectionProp =
	| TitleSectionPropWithPillTypeLink
	| TitleSectionPropWithPillTypeNone;

const TitleSection: React.FC<TitleSectionProp> = ({
	subheading,
	heading,
	pill,
	pillVariant = "ROUNDED",
	pillType = "NONE",
	headingClass,
	paragraphClass,
	containerClassName,
	...rest
}) => {
	return (
		<section
			className={cn(
				"flex flex-col items-start justify-center gap-8 md:items-center",
				containerClassName,
			)}
		>
			{pill && pillType && (
				<Pills variant={pillVariant}>
					{pillType === "LINK" && (
						<Link
							className="transition-all hover:opacity-70"
							href={
								((rest as any)?.href && (rest as any)?.href) ||
								"/"
							}
						>
							{pill}
						</Link>
					)}
					{pillType === "NONE" && pill}
				</Pills>
			)}
			{subheading ? (
				<>
					<h1
						className={cn(
							"from-primary-200 block h-full max-w-[20ch] bg-gradient-to-b to-sky-200 bg-clip-text py-5 text-center text-5xl leading-none font-extrabold text-balance text-transparent md:text-6xl lg:text-8xl",
							headingClass,
						)}
					>
						{heading}
					</h1>
					<p
						className={cn(
							"text-primary-100 [&>strong]:text-primary-50 max-w-[50ch] text-center text-pretty lg:text-lg [&>strong]:font-medium",
							paragraphClass,
						)}
					>
						{subheading}
					</p>
				</>
			) : (
				<h1
					className={cn(
						"from-primary-200 block h-full max-w-[20ch] bg-gradient-to-b to-sky-200 bg-clip-text py-5 text-center text-5xl leading-none font-extrabold text-balance text-transparent md:text-6xl lg:text-8xl",
						headingClass,
					)}
				>
					{heading}
				</h1>
			)}
		</section>
	);
};

export default TitleSection;
