'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import React, { useEffect, useId, useRef, useState } from 'react';
import { useMemo } from 'react';

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	x?: number;
	y?: number;
	cx?: number;
	cy?: number;
	cr?: number;
	className?: string;
	glow?: boolean;
}

export function DotPattern({
	width = 24, // Increased spacing to reduce dots
	height = 24,
	x = 0,
	y = 0,
	cx = 2,
	cy = 2,
	cr = 1.5,
	className,
	glow = false,
	...props
}: DotPatternProps) {
	const id = useId();
	const containerRef = useRef<SVGSVGElement>(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	// Resize observer to update dimensions
	useEffect(() => {
		const updateDimensions = () => {
			if (containerRef.current) {
				const { width, height } =
					containerRef.current.getBoundingClientRect();
				setDimensions({ width, height });
			}
		};
		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	}, []);

	const dots = useMemo(
		() =>
			Array.from(
				{
					length:
						Math.ceil(dimensions.width / width) *
						Math.ceil(dimensions.height / height),
				},
				(_, i) => {
					const col = i % Math.ceil(dimensions.width / width);
					const row = Math.floor(
						i / Math.ceil(dimensions.width / width),
					);
					return {
						x: col * width + cx,
						y: row * height + cy,
						delay: Math.random() * 5,
						duration: Math.random() * 3 + 2,
					};
				},
			),
		[dimensions, width, height, cx, cy],
	);

	return (
		<svg
			ref={containerRef}
			aria-hidden="true"
			className={cn(
				'pointer-events-none absolute inset-0 h-full w-full',
				className,
			)}
			{...props}
		>
			<defs>
				<radialGradient id={`${id}-gradient`}>
					<stop
						offset="0%"
						stopColor="currentColor"
						stopOpacity="1"
					/>
					<stop
						offset="100%"
						stopColor="currentColor"
						stopOpacity="0"
					/>
				</radialGradient>
			</defs>

			<motion.g>
				{dots.map((dot, index) => (
					<motion.circle
						key={index}
						cx={dot.x}
						cy={dot.y}
						r={cr}
						fill={glow ? `url(#${id}-gradient)` : 'currentColor'}
						className="text-neutral-400/80"
						initial={glow ? { opacity: 0.5 } : {}}
						animate={
							glow
								? {
										opacity: [0.5, 1, 0.5],
									}
								: {}
						}
						transition={
							glow
								? {
										duration: dot.duration,
										repeat: Infinity,
										repeatType: 'reverse',
										delay: dot.delay,
										ease: 'easeInOut',
									}
								: {}
						}
					/>
				))}
			</motion.g>
		</svg>
	);
}
