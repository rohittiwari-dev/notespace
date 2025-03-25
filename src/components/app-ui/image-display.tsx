import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';

import Image, { ImageProps } from 'next/image';
import React from 'react';

function ImageDisplay({
	animationKey,
	containerClass,
	isActiveInitialAnimation = true,
	...props
}: ImageProps & {
	containerClass?: string;
	animationKey?: string;
	isActiveInitialAnimation?: boolean;
}) {
	return (
		<AnimatePresence
			initial={isActiveInitialAnimation}
			mode="sync"
			presenceAffectsLayout
		>
			<motion.div
				key={animationKey}
				initial={{
					opacity: 0.5,
				}}
				animate={{
					opacity: 1,
				}}
				transition={{
					duration: 1,
					ease: 'easeInOut',
				}}
				className={cn(
					'flex flex-col gap-4 bg-accent-foreground/12 border border-accent-purple/30 rounded-lg p-2',
					containerClass,
				)}
			>
				<Image {...props} />
			</motion.div>
		</AnimatePresence>
	);
}

export default ImageDisplay;
