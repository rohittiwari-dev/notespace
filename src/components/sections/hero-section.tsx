import React from "react";
import { Button } from "../ui/button";
import TitleSection from "./title-section";
import Image from "next/image";
import headerImg from "@/assets/headerImage.png";

const HeroSection = () => {
	return (
		<div className="relative flex flex-col items-center">
			<div className="mt-32" />
			<TitleSection
				heading="Realtime Notes, Always Ready!"
				pill="Star on Github ✨"
				pillVariant="ROUNDED"
				pillType="LINK"
				href="https://github.com/rohittiwari-dev/notespace"
				subheading="An Open-Source Productivity Platform Designed to Simplify and Supercharge Student Study and Organization!"
			/>
			<div className="my-10 flex w-full items-center justify-center">
				<Button className="rounded-full">Get Started Here</Button>
			</div>
			<div className="relative mt-6 flex h-full w-full items-center justify-center dark:mt-24">
				<div className="glow-bg container-main absolute z-0 m-0 h-[95%] w-[80%] rounded-4xl opacity-25 blur-3xl dark:opacity-40 dark:bg-blend-multiply" />
				<Image
					src={headerImg}
					alt="Header Hero Image"
					className="container-main bg-secondary-900 z-0 !m-0 h-[95%] w-[80%] overflow-clip rounded-[3rem] object-fill p-0 ring-indigo-950/80 contrast-90 saturate-200 dark:bg-transparent"
				/>
			</div>
		</div>
	);
};

export default HeroSection;
