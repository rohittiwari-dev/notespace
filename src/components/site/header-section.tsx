'use client';

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
					<Pill
						variant="SQUARICLE"
						href="https://github.com/rohittiwari-dev/notespace"
					>
						<span>✨ Star on Github</span>
					</Pill>
					<h1 className="font-semibold text-3xl md:text-4xl">
						Welcome to the Future of Note Taking and student Mind
						space with collaborative environment. NoteSpace!
					</h1>
				</div>
				<div className="flex flex-col gap-4 items-start w-full md:w-[30%] justify-center">
					<p className="text-accent-foreground/60">
						Capture ideas, share notes, and work with friends in
						real time. Plus, enjoy collaborative project management,
						whiteboards, and a student-focused digital workspace—all
						in one place! 🚀
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
