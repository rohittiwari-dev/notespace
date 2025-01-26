import CalendarSection from "@/components/sections/calendar-section";
import HeroSection from "@/components/sections/hero-section";
import TestimonialSliderSection from "@/components/sections/testimonial-slider-section";
import React from "react";

const Home = () => {
	return (
		<main className="z-0 h-fit w-full">
			<HeroSection />
			<CalendarSection />
			<TestimonialSliderSection />
		</main>
	);
};

export default Home;
