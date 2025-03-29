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
	ringColor = 'text-primary-500',
	className,
	alt = '@shadcn',
	imageClassName,
	fallbackClassName,
	shape = 'circle',
}) => {
	return (
		<CoreAvatar.Avatar
			className={cn(
				`size-[${size}px]`,
				ring && 'ring-1',
				ring && ringColor,
				'border-accent',
				shape === 'circle' && 'rounded-full',
				shape === 'square' && 'rounded-none',
				shape === 'rounded' && 'rounded-md',
				className,
			)}
		>
			<CoreAvatar.AvatarImage
				className={imageClassName}
				src={href}
				alt={alt}
			/>
			<CoreAvatar.AvatarFallback
				className={cn(
					'w-full h-full',
					ring && 'ring-1',
					ring && ringColor,
					'border-accent',
					shape === 'circle' && 'rounded-full',
					shape === 'square' && 'rounded-none',
					shape === 'rounded' && 'rounded-md',
					fallbackClassName,
				)}
			>
				{initial}
			</CoreAvatar.AvatarFallback>
		</CoreAvatar.Avatar>
	);
};

export default Avatar;
