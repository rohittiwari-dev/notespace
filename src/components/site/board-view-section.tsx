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
	const { resolvedTheme } = useTheme();

	return (
		<div className="flex flex-col mt-30 items-center justify-center ">
			<TitleSection
				heading="Project Management"
				subheading="Manage your academic projects effortlessly with our student-friendly project management system. Plan, collaborate, and track progress—all in one place!"
			/>
			<div className="w-full h-full flex md:mt-12 flex-col md:flex-row gap-8 md:gap-16  mt-8">
				<div className="w-full h-full">
					<ImageDisplay
						src={
							resolvedTheme === 'light'
								? BoardImageLight
								: BoardImageDark
						}
						alt="Header Image"
						containerClass="rounded-2xl overflow-hidden"
						className="w-full h-full rounded-2xl"
						animationKey={`board-${resolvedTheme}`}
					/>
				</div>
				<div className="w-full h-full space-y-8">
					<h2 className="text-3xl md:text-4xl font-bold">
						Take Notes, Collaborate & Stay Productive!
					</h2>
					<p className="text-accent-foreground/60">
						Stay organized and manage projects effortlessly with our
						fully featured project management board. Plan tasks,
						collaborate in real time, and track progress—all in one
						intuitive workspace designed for students.
					</p>

					<p className="text-accent-foreground/60">
						Boost your productivity with a powerful project
						management board designed for students. Organize tasks
						efficiently and collaborate seamlessly with your peers.
						Stay on top of deadlines and manage projects with ease!
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
