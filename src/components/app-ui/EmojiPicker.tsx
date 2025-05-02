'use client';
import React, { ComponentProps, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useTheme } from 'next-themes';
import { Theme } from 'emoji-picker-react';

// Preload the picker for better performance
const Picker = dynamic(() => import('emoji-picker-react'), {
	ssr: false,
	loading: () => (
		<div className="w-[348px] h-[435px] bg-background animate-pulse rounded-md" />
	),
});

type TEmojiPicker = {
	children?: ComponentProps<any>;
	getEmoji?: (emoji: string) => void;
	disabled?: boolean;
};

const EmojiPicker: React.FC<TEmojiPicker> = ({
	children,
	getEmoji,
	disabled,
}) => {
	const { resolvedTheme } = useTheme();
	const [open, setOpen] = useState(false);

	// Memoize the onClick handler to prevent unnecessary rerenders
	const onClick = useCallback(
		(selectedEmoji: any) => {
			if (getEmoji) getEmoji(selectedEmoji?.emoji);
			setOpen(false); // Close picker after selection
		},
		[getEmoji],
	);

	return (
		<div className="flex w-full h-full justify-center items-center !transition-none">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger className="!transition-none w-full h-full hover:cursor-pointer">
					{children}
				</PopoverTrigger>
				{open && (
					<PopoverContent
						align="start"
						sideOffset={-115}
						alignOffset={85}
						className="!animate-none border-none p-0 scale-90 !transition-none !duration-0 !ease-linear"
					>
						<Picker
							onEmojiClick={!disabled ? onClick : () => {}}
							theme={
								resolvedTheme === 'dark'
									? Theme.DARK
									: Theme.LIGHT
							}
						/>
					</PopoverContent>
				)}
			</Popover>
		</div>
	);
};

export default EmojiPicker;
