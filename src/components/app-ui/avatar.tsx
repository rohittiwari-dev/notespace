import React from 'react';

import * as CoreAvatar from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface AvatarProps {
	size?: number;
	ring?: boolean;
	ringColor?: string;
	initial?: string;
	href?: string;
	alt?: string;
	className?: string;
	imageClassName?: string;
	fallbackClassName?: string;
	shape?: 'circle' | 'square' | 'rounded';
}

const Avatar: React.FC<AvatarProps> = ({
	href = 'https://github.com/shadcn.png',
	initial = 'UR',
	size = 24,
	ring = true,
	ringColor = 'text-primary-200 dark:text-primary-800',
	className,
	alt = '@shadcn',
	imageClassName,
	fallbackClassName,
	shape = 'circle',
}) => {
	return (
		<CoreAvatar.Avatar
			className={cn(
				`size-[${size}px] dark:bg-secondary-700/60 ring-1 w-full h-full ring-accent/80 bg-secondary-100`,
				ring && 'ring-1',
				ring && ringColor,
				'border-border',
				shape === 'circle' && 'rounded-full',
				shape === 'square' && 'rounded-none',
				shape === 'rounded' && 'rounded-md',
				className,
			)}
		>
			<CoreAvatar.AvatarImage
				className={cn('w-full h-full', imageClassName)}
				src={href}
				alt={alt}
			/>
			<CoreAvatar.AvatarFallback
				className={cn(
					`size-[${size}px]  dark:bg-secondary-700/60 bg-secondary-100 `,
					'w-full h-full ',
					ring && 'ring-1',
					ring && ringColor,
					'border-border',
					shape === 'circle' && 'rounded-full',
					shape === 'square' && 'rounded-none',
					shape === 'rounded' && 'rounded-md',
					fallbackClassName,
				)}
			>
				<span className="text-foreground">{initial}</span>
			</CoreAvatar.AvatarFallback>
		</CoreAvatar.Avatar>
	);
};

export default Avatar;
