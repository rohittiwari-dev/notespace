"use client";
import TestimonialCards from "../app-ui/testimonial-card";
import { cn } from "@/lib/utils";

const TestimonialSection = () => {
	const testimonials = [
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
		<section className="z-[1] w-full h-full">
			{[...Array(2)].map((arr, mainIndex) => (
				<div
					key={mainIndex}
					className={cn(
						"relative w-full mx-auto min-h-[270px] sm:min-h-[200px] xs:min-h-[220px] mt-10 mask-gradient-r",
					)}
				>
					{testimonials.map((testimonial, index) => (
						<TestimonialCards
							key={index}
							className={cn(
								"absolute h-fit ",
								`animate-[calc(30s / ${testimonials.length} * (${testimonials.length} - ${index}) * -${index})]`,
								{
									"animate-[scroll-left_30s_linear_infinite] max-[calc(200px * 8), 100%]":
										mainIndex === 0,
									"animate-[scroll-right_30s_linear_infinite] max-[calc(200px * 8), calc(100% + 200px)]":
										mainIndex === 1,
								},
							)}
						/>
					))}
				</div>
			))}
		</section>
	);
};

export default TestimonialSection;
