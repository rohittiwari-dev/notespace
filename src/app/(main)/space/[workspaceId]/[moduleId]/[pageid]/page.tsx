'use client';
import NoteHeader from '@/components/notespace-editor/note-ui/note-header';
import dynamic from 'next/dynamic';

const NotespaceEditor = dynamic(() => import('@/components/notespace-editor'), {
	ssr: false,
});

export default function Home() {
	return (
		<div className="relative flex flex-col w-full min-h-full bg-sidebar/60 backdrop-blur-md shadow transition-colors rounded-t-lg duration-300 rounded-sm border border-secondary-200/60 dark:border-secondary-700/80">
			<NoteHeader />
			<section className="flex-1 w-full ">
				<NotespaceEditor />
			</section>
		</div>
	);
}
