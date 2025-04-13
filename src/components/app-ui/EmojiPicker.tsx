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
						align="end"
						className="!animate-none border-none p-0 !transition-none !duration-0 !ease-linear"
					>
						<Picker
							onEmojiClick={!disabled ? onClick : () => {}}
							theme={
								resolvedTheme === 'dark'
									? Theme.DARK
									: Theme.LIGHT
							}
							lazyLoadEmojis={false} // Changed to false for faster display
							searchDisabled={true} // Disable search to reduce initial load time
							skinTonesDisabled={true} // Disable skin tones to reduce complexity
						/>
					</PopoverContent>
				)}
			</Popover>
		</div>
	);
};

export default EmojiPicker;
