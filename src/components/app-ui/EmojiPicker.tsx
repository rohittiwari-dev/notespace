'use client';
import React, { ComponentProps } from 'react';
import dynamic from 'next/dynamic';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useTheme } from 'next-themes';
import { Theme } from 'emoji-picker-react';

const Picker = dynamic(() => import('emoji-picker-react'));

type TEmojiPicker = {
	children?: ComponentProps<any>;
	getEmoji?: (emoji: string) => void;
};

const EmojiPicker: React.FC<TEmojiPicker> = ({ children, getEmoji }) => {
	const { theme } = useTheme();
	const onClick = async (selectedEmoji: any) => {
		if (getEmoji) getEmoji(selectedEmoji?.emoji);
	};
	return (
		<div className="flex w-full h-full justify-center items-center !transition-none">
			<Popover>
				<PopoverTrigger className="!transition-none  w-full h-full  hover:cursor-pointer">
					{children}
				</PopoverTrigger>
				<PopoverContent
					align="end"
					className="!animate-none border-none p-0 !transition-none !duration-0 !ease-linear"
				>
					<Picker
						onEmojiClick={onClick}
						theme={theme === 'dark' ? Theme.DARK : Theme.LIGHT}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default EmojiPicker;
