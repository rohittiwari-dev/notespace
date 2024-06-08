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
				"flex items-start flex-col md:items-center gap-4 justify-center"
			}
		>
			<Pills variant={pillVariant}>{pill}</Pills>
			{subheading ? (
				<>
					<h1
						className={
							"text-3xl sm:text-4xl sm:max-w-[750px] text-left md:text-center font-semibold"
						}
					>
						{heading}
					</h1>
					<p
						className={
							"dark:text-washed-purple-700 sm:max-w-700 md:text-center"
						}
					>
						{subheading}
					</p>
				</>
			) : (
				<h1
					className={
						"text-3xl sm:text-5xl sm:max-w-[850px] text-left md:text-center font-semibold"
					}
				>
					{heading}
				</h1>
			)}
		</section>
	);
};

export default TitleSection;
