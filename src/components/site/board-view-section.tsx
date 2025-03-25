'use client';
import React from 'react';
import ImageDisplay from '@/components/app-ui/image-display';
import TitleSection from '@/components/app-ui/title-section';
import BoardImageLight from '@/assets/board-ui-light.png';
import BoardImageDark from '@/assets/board-ui-dark.png';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';

function BoardViewSection() {
	const { theme } = useTheme();

	return (
		<div className="flex flex-col mt-10 items-center justify-center ">
			<TitleSection
				pill="✨ Introducing Magic UI"
				heading="Notespace"
				subheading="The AI-powered note-taking app"
			/>
			<div className="w-full h-full flex md:mt-12 flex-col md:flex-row gap-8 md:gap-16  mt-8">
				<div className="w-full h-full">
					<ImageDisplay
						src={
							theme === 'light' ? BoardImageLight : BoardImageDark
						}
						alt="Header Image"
						containerClass="rounded-2xl overflow-hidden"
						className="w-full h-full rounded-2xl"
						animationKey={`board-${theme}`}
					/>
				</div>
				<div className="w-full h-full space-y-8">
					<h2 className="text-3xl md:text-4xl font-bold">
						Added Fully Featured Project management Board to boost
						your productivity
					</h2>
					<p className="text-accent-foreground/60">
						Notespace is a note-taking app that allows you to create
						notes with AI-powered search and organization. Lorem
						ipsum dolor sit amat consectetur adipisicing edit.
					</p>

					<p className="text-accent-foreground/60">
						Notespace is a note-taking app that allows you to create
						notes with AI-powered search and organization. Lorem
						ipsum dolor sit abet consectetur adipisicing elia.
					</p>
					<div className="space-y-2 block">
						<p>Getting Started with Notespace is not regrettable</p>
						<div className="flex items-center gap-2">
							<Button>Get Started</Button>
							<Link
								href="https://www.projectmanager.com/blog/project-management-techniques-for-every-pm"
								target="_blank"
								rel="noopener noreferrer"
								className={buttonVariants({
									variant: 'link',
									className:
										'text-accent-foreground/60 hover:text-accent-foreground',
								})}
							>
								Learn More
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BoardViewSection;
