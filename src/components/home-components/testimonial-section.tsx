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
		<section className="z-[1] h-full w-full">
			{[...Array(2)].map((arr, mainIndex) => (
				<div
					key={mainIndex}
					className={cn(
						"relative mx-auto mt-10 min-h-[270px] w-full mask-gradient-r xs:min-h-[220px] sm:min-h-[200px]",
					)}
				>
					{testimonials.map((testimonial, index) => (
						<TestimonialCards
							key={index}
							className={cn(
								"absolute h-fit",
								`animate-[calc(30s / ${testimonials.length} * (${testimonials.length} - ${index}) * -${index})]`,
								{
									"max-[calc(200px * 8), 100%] animate-[scroll-left_30s_linear_infinite]":
										mainIndex === 0,
									"max-[calc(200px * 8), calc(100% + 200px)] animate-[scroll-right_30s_linear_infinite]":
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
