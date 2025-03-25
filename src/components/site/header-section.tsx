'use client';
import { ArrowRightIcon } from 'lucide-react';
import Pill from '../app-ui/pills';
import React from 'react';
import { Button } from '../ui/button';
import ImageDisplay from '../app-ui/image-display';
import HeaderImageDark from '@/assets/headerImage-dark.png';
import HeaderImageLight from '@/assets/headerImage-light.png';
import { useTheme } from 'next-themes';

function HeaderSection() {
	const { theme } = useTheme();
	return (
		<div className="w-full space-y-8 md:space-y-16 mt-10">
			<div className="flex md:items-end items-center mt-4 flex-col md:flex-row md:gap-16 gap-8 justify-between">
				<div className="flex flex-col gap-4 w-full md:w-[70%] items-start justify-center">
					<Pill>
						<span>✨ Introducing Magic UI</span>
						<ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
					</Pill>
					<h1 className="font-semibold text-3xl md:text-4xl">
						Welcome to the future of AI-powered productivity and
						collaborative note taking app focused on simplicity for
						students
					</h1>
				</div>
				<div className="flex flex-col gap-4 items-start w-full md:w-[30%] justify-center">
					<p className="text-accent-foreground/60">
						Lorem ipsum dolor sit abet consectetur adipisicing edit.
						Quisquam, quos. Lorem ipsum dolor sit abet consectetur
						adipisicing edit. Quisquam, quos.
					</p>
					<div className="flex items-center gap-2">
						<Button size="sm">Get Started</Button>
						<Button size="sm" variant="outline">
							Learn More
						</Button>
					</div>
				</div>
			</div>

			<ImageDisplay
				animationKey={`header-image-${theme}`}
				src={theme === 'light' ? HeaderImageLight : HeaderImageDark}
				alt="Header Image"
				containerClass="rounded-2xl overflow-hidden"
				className="w-full h-full rounded-2xl"
			/>
		</div>
	);
}

export default HeaderSection;
