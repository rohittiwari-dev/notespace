import React from "react";
import TitleSection from "./title-section";
import Image from "next/image";
import CalendarImage from "@/assets/CalendarImage.png";

const CalendarSection = () => {
	return (
		<div className="md:item-center container-main mt-30 flex flex-col gap-4 overflow-hidden px-4 sm:px-6 md:justify-center">
			<TitleSection
				heading="Keep Notes and Docs Together!"
				pill="Calendar Feature"
				subheading="Capture Your Idea, Thoughts, Meeting Notes, Code Notes or Student Notes in Structured and Organized Manner"
			/>

			<div className="sm:1/2 relative mx-auto w-2/3">
				<div className="bg-primary pointer-events-none absolute -top-[2rem] left-1/2 z-[3] h-[10vh] w-[86%] -translate-x-1/2 rounded-full opacity-40 blur-[65px]" />
				<div className="bg-primary absolute -top-[2rem] left-1/2 -z-1 h-[8vh] w-[86%] -translate-x-1/2 rounded-full opacity-80 blur-[60px]" />
				<Image
					src={CalendarImage}
					className="z-[1] w-full"
					alt="Header Image"
				/>
			</div>
		</div>
	);
};

export default CalendarSection;
