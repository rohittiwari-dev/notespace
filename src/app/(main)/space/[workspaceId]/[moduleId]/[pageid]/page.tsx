'use client';
import notFound from '@/app/not-found';
import NoteHeader from '@/components/notespace-editor/note-ui/note-header';
import { isCuid2 } from '@/lib/utils/isCuid';
import dynamic from 'next/dynamic';
import { use } from 'react';

const NotespaceEditor = dynamic(() => import('@/components/notespace-editor'), {
	ssr: false,
});

export default function Home({
	params,
}: {
	params: Promise<{ pageid: string; moduleId: string }>;
}) {
	const pageId = use(params).pageid;
	const moduleId = use(params).moduleId;
	if (!isCuid2(pageId)) return notFound();
	return (
		<div className="relative flex flex-col bg-sidebar/60 shadow backdrop-blur-md border border-secondary-200/60 dark:border-secondary-700/80 rounded-sm rounded-t-lg w-full min-h-full transition-colors duration-300">
			<NoteHeader noteId={pageId} moduleId={moduleId} />
			<section className="flex-1 w-full">
				<NotespaceEditor noteId={pageId} />
			</section>
		</div>
	);
}
