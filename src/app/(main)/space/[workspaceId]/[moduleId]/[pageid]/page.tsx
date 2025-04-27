'use client';
import dynamic from 'next/dynamic';

const NotespaceEditor = dynamic(() => import('@/components/notespace-editor'), {
	ssr: false,
});

export default function Home() {
	return <NotespaceEditor />;
}
