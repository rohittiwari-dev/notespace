import React from "react";
import { InfiniteSlider } from "../core/infinite-slider";
import TestimonialCards from "../app-ui/testimonial-card";
import TitleSection from "./title-section";

const TestimonialSliderSection = () => {
	const TestimonialsSection1 = [
		{
			avatar: "",
			name: "",
			handle: "",
			message: "",
		},
		{
			avatar: "",
			name: "",
			handle: "",
			message: "",
		},
		{
			avatar: "",
			name: "",
			handle: "",
			message: "",
		},
		{
			avatar: "",
			name: "",
			handle: "",
			message: "",
		},
		{
			avatar: "",
			name: "",
			handle: "",
			message: "",
		},
	];

	const TestimonialsSection2 = [
		{
			avatar: "",
			name: "",
			handle: "",
			message: "",
		},
		{
			avatar: "",
			name: "",
			handle: "",
			message: "",
		},
		{
			avatar: "",
			name: "",
			handle: "",
			message: "",
		},
		{
			avatar: "",
			name: "",
			handle: "",
			message: "",
		},
		{
			avatar: "",
			name: "",
			handle: "",
			message: "",
		},
	];

	return (
		<section className="container-main my-30 h-fit w-full space-y-14">
			<TitleSection
				heading="Here are some review from the users"
				pill="Testimonial"
				pillVariant="ROUNDED"
				subheading="An Open-Source Productivity Platform Designed to Simplify and Supercharge Student Study and Organization!"
			/>
			<div className="fade-x-36 h-fit w-full space-y-14">
				<InfiniteSlider gap={20}>
					{TestimonialsSection1.map((val, index) => (
						<TestimonialCards
							key={index + val.name}
							className="mr-10"
						/>
					))}
				</InfiniteSlider>
				<InfiniteSlider gap={20} reverse>
					{TestimonialsSection2.map((val, index) => (
						<TestimonialCards
							className="ml-10"
							key={index + val.name}
						/>
					))}
				</InfiniteSlider>
			</div>
		</section>
	);
};

export default TestimonialSliderSection;
