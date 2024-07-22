"use client";
import React, { ComponentProps } from "react";
import dynamic from "next/dynamic";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type TEmojiPicker = {
	children?: ComponentProps<any>;
	getEmoji?: (emoji: string) => void;
};

const EmojiPicker: React.FC<TEmojiPicker> = ({ children, getEmoji }) => {
	const Picker = dynamic(() => import("emoji-picker-react"));
	const onClick = async (selectedEmoji: any) => {
		if (getEmoji) getEmoji(selectedEmoji.emoji);
	};
	return (
		<div className="flex items-center !transition-none">
			<Popover>
				<PopoverTrigger className="!transition-none hover:cursor-pointer">
					{children}
				</PopoverTrigger>
				<PopoverContent
					align="end"
					className="!animate-none border-none p-0 !transition-none !duration-0 !ease-linear"
				>
					<Picker onEmojiClick={onClick} />
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default EmojiPicker;
