import React from "react";
import * as CoreAvatar from "@/components/ui/avatar";

interface AvatarProps {
	size?: "small" | "default" | "large";
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
	href = "https://github.com/shadcn.png",
	initial = "UR",
	size = "default",
	ring = true,
	ringColor = "text-primary-500",
	className,
	alt = "@shadcn",
	imageClassName,
	fallbackClassName,
}) => {
	return (
		<CoreAvatar.Avatar className={className}>
			<CoreAvatar.AvatarImage
				className={imageClassName}
				src={href}
				alt={alt}
			/>
			<CoreAvatar.AvatarFallback className={fallbackClassName}>
				{initial}
			</CoreAvatar.AvatarFallback>
		</CoreAvatar.Avatar>
	);
};

export default Avatar;
