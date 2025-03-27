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
}) => {
	return (
		<CoreAvatar.Avatar
			className={cn(
				size && `size-[${size}]`,
				ring && 'ring-1',
				ringColor && `ring-accent`,
				'border-accent',
				className,
			)}
		>
			<CoreAvatar.AvatarImage
				className={imageClassName}
				src={href}
				alt={alt}
			/>
			<CoreAvatar.AvatarFallback
				className={cn('w-full h-full', fallbackClassName)}
			>
				{initial}
			</CoreAvatar.AvatarFallback>
		</CoreAvatar.Avatar>
	);
};

export default Avatar;
