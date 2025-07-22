import EmojiPicker from '@/components/app-ui/EmojiPicker';
import { Input } from '@/components/ui/input';
import React from 'react';

const NoteHeader = () => {
	const [state, setState] = React.useState({
		title: 'Untitled',
		description: '',
		icon: '',
		createdAt: new Date(),
		updatedAt: new Date(),
		tags: [],
	});
	return (
		<div className="w-full h-fit flex flex-col rounded-t-lg ">
			<div
				style={{
					background: "url('/thumbnail.png')",
				}}
				className="w-full h-[15rem]"
			/>
			<div className="p-4">
				<div className="text-5xl relative cursor-pointer  w-24 h-24 bg-secondary-100  border-secondary-200 dark:bg-secondary-800  rounded-xl">
					<EmojiPicker />
				</div>
				<div className="flex flex-col gap-2 mt-4">
					<h1 className="text-3xl font-semibold">{state.title}</h1>
					<p className="text-secondary-500 dark:text-secondary-400">
						Note description
					</p>
					<Input className="focus-visible:!ring-none !outline-none dark:focus-visible:ring-none border-none" />
					<Input className="focus-visible:!ring-none dark:focus-visible:ring-none  border-none" />
				</div>
			</div>
		</div>
	);
};

export default NoteHeader;
