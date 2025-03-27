'use client';
import { cn } from '@/lib/utils';

import Image, { ImageProps } from 'next/image';
import React, { useEffect, useState } from 'react';

function ImageDisplay({
	animationKey,
	containerClass,
	...props
}: ImageProps & {
	containerClass?: string;
	animationKey?: string;
}) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		isMounted && (
			<div
				className={cn(
					'flex flex-col gap-4 bg-accent-foreground/12 border border-accent-purple/30 rounded-lg p-2',
					'animate-in fade-in-0 duration-1000',
					containerClass,
				)}
			>
				<Image {...props} alt={props.alt} />
			</div>
		)
	);
}

export default ImageDisplay;
