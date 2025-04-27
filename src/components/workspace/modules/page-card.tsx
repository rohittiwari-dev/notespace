import useAppStore from '@/store';
import Link from 'next/link';
import React, { useState } from 'react';

type PageCardProps = {
	url?: string;
};

function PageCard({ url = 'https://devnotespace.netlify.app' }: PageCardProps) {
	const { workspace, module } = useAppStore();
	const [localUrl, setlocalUrl] = useState(url);
	const [thumbnail, setThumbnail] = useState('');
	const [loading, setLoading] = useState(false);

	return (
		<Link
			href={`/space/${workspace?.id}/${module?.id}/1`}
			className="sm:max-w-64 sm:max-h-48 relative w-full h-full bg-card shadow-md shadow-primary-800/60 rounded-lg overflow-hidden border border-primary-700/50 flex flex-col gap-2"
		>
			<iframe
				style={{
					msScrollbar3dlightColor: 'transparent',
					scrollbarColor: 'transparent',
					msScrollbarArrowColor: 'transparent',
					msScrollbarDarkshadowColor: 'transparent',
					msScrollbarBaseColor: 'transparent',
					msScrollbarTrackColor: 'transparent',
					msScrollbarHighlightColor: 'transparent',
					msScrollbarFaceColor: 'transparent',
					msScrollbarShadowColor: 'transparent',
					msOverflowStyle: 'none',
					scrollbarWidth: 'none',
					overflow: 'hidden',
					border: 'none',
					borderRadius: '0.5rem',
					width: '100%',
					height: '100%',
					display: 'block',
					background: 'transparent',
					scrollbarGutter: 'stable',
					scrollBehavior: 'smooth',
					scrollSnapType: 'none',
					scrollSnapAlign: 'none',
					scrollSnapStop: 'always',
					WebkitOverflowScrolling: 'touch',
				}}
				src="https://devnotespace.netlify.app/"
				className="pointer-events-none select-none iframe-no-scrollbar scroll-transparent scrollbar-none appearance-none w-full h-full block overflow-hidden bg-secondary-800 rounded-md border-primary-700/50"
			/>
		</Link>
	);
}

export default PageCard;
