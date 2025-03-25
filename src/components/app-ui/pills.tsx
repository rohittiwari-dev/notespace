'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import { AnimatedShinyText } from '../primitives/animated-shiny-text';
import { ArrowRightIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

interface PillProps {
	children?: React.ReactNode;
	className?: string;
	href?: string;
	onClick?: () => void;
	variant?: 'SQUARE' | 'SQUARICLE' | 'ROUNDED';
}

function Pill({
	children,
	className,
	href,
	variant = 'ROUNDED',
	onClick,
}: PillProps) {
	return (
		<div
			className={cn(
				'group border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800',
				variant === 'SQUARE' && 'rounded-[3px]',
				variant === 'SQUARICLE' && 'rounded-lg',
				variant === 'ROUNDED' && 'rounded-full',
				className,
			)}
			onClick={() => {
				if (href) {
					redirect(href);
				} else {
					onClick?.();
				}
			}}
		>
			<AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
				{children || (
					<>
						{' '}
						<span>✨ Introducing Magic UI</span>{' '}
						<ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
					</>
				)}
			</AnimatedShinyText>
		</div>
	);
}

export default Pill;
