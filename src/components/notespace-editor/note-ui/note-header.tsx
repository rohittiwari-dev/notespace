// import EmojiPicker from '@/components/app-ui/EmojiPicker';
// import Image from 'next/image';
import React from 'react';

const NoteHeader = () => {
	return (
		<div className="w-full h-fit flex flex-col border-b rounded-t-lg border-secondary-200/60 dark:border-secondary-700/60">
			<div
				style={{
					background: "url('/thumbnail.png')",
				}}
				className="w-full h-[15rem]"
			/>
			<div className="p-4">
				<div className="text-5xl relative  w-24 h-24 bg-secondary-100  border-secondary-200 dark:bg-secondary-800 border dark:border-secondary-700/60 rounded-xl">
					{/* {false ? (
						<Image
							src="/next.svg"
							alt="workspace logo"
							width={100}
							height={100}
							className="rounded-xl"
						/>
					) : (
						<EmojiPicker />
					)} */}
				</div>
			</div>
		</div>
	);
};

export default NoteHeader;
