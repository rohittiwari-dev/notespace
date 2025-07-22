import { cn } from '@/lib/utils';
import useAppStore from '@/store';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function PageCard() {
	const { workspace, module } = useAppStore();

	return (
		<Link
			href={`/space/${workspace?.id}/${module?.id}/1`}
			className="sm:max-w-64 sm:max-h-48 relative w-full block h-full bg-card shadow hover:ring-4 transition-all ease-in-out duration-500 hover:dark:ring-indigo-900/50 hover:shadow-md shadow-primary-300/20 dark:shadow-primary-800/60 rounded-lg overflow-hidden border dark:border-primary-700/50 border-primary-300/30 hover:ring-indigo-400/30"
		>
			{/* {loading && (
				<Image
					src="/placeholder.png"
					alt="Loading..."
					fill
					className="absolute w-full h-full object-cover animate-pulse "
				/>
			)} */}
			{/* {!loading && ( */}
			<Image
				alt="Page Preview"
				src="/thumbnail.png"
				fill
				loading="lazy"
				blurDataURL="/placeholder.png"
				className={cn('absolute')}
			/>
			{/* )} */}
		</Link>
	);
}

export default PageCard;
