import React from "react";
import Pills from "@/components/app-ui/pills";

type TitleSectionProp = {
	subheading?: string;
	heading: string;
	pill: string;
	pillVariant?: "SQUARE" | "SQUARICLE" | "ROUNDED";
};

const TitleSection: React.FC<TitleSectionProp> = ({
	subheading,
	heading,
	pill,
	pillVariant = "ROUNDED",
}) => {
	return (
		<section
			className={
				"flex flex-col items-start justify-center gap-4 md:items-center"
			}
		>
			<Pills variant={pillVariant}>{pill}</Pills>
			{subheading ? (
				<>
					<h1
						className={
							"text-left text-3xl font-semibold sm:max-w-[750px] sm:text-4xl md:text-center"
						}
					>
						{heading}
					</h1>
					<p
						className={
							"sm:max-w-700 dark:text-washed-purple-700 md:text-center"
						}
					>
						{subheading}
					</p>
				</>
			) : (
				<h1
					className={
						"text-left text-3xl font-semibold sm:max-w-[850px] sm:text-5xl md:text-center"
					}
				>
					{heading}
				</h1>
			)}
		</section>
	);
};

export default TitleSection;
