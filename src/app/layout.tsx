import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/lib/providers';
import { constructMetadata, generateViewport } from '@/utils/generateMetadata';
import Head from 'next/head';

const geistSans = Geist({
	variable: '--font-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = constructMetadata();
export const viewport: Viewport = generateViewport();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${geistSans.variable} ${geistMono.variable}`}
		>
			<Head>
				<meta name="apple-mobile-web-app-title" content="Notespace" />
			</Head>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
