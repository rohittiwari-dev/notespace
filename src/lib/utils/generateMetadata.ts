import type { Metadata, Viewport } from 'next';
import { getBaseUrl } from '@/lib/utils/getBaseUrl';
import { constants } from '@/lib/constants';

/**
 * A utility function to construct metadata for the application which can be
 * used per page.
 * @param params - The parameters for the metadata.
 * @param params.title The title of the page.
 * @param params.description The description of the page.
 * @param params.image The image of the page.
 * @param params.icons The icons of the page.
 * @param params.noIndex Whether to no-index the page.
 * @param params.url The URL of the page.
 * @param params.type The type of the page, either 'website' or 'article'.
 * @param params.publishedTime The published time of the article.
 * @returns The metadata for the page.
 */
export function constructMetadata({
	title = constants.name,
	description = constants.description,
	image = `${getBaseUrl()}/thumbnail.jpg`,
	icons = [
		{
			rel: 'apple-touch-icon',
			sizes: '32x32',
			url: '/apple-touch-icon.png',
			type: 'image/png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			url: '/icon.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			url: '/icon.png',
		},
	],
	keywords = [],
	noIndex = false,
	url = getBaseUrl(),
	type = 'website',
	publishedTime,
}: {
	title?: string;
	description?: string;
	image?: string | null;
	icons?: Metadata['icons'];
	noIndex?: boolean;
	url?: string;
	type?: 'website' | 'article';
	publishedTime?: string;
	keywords?: string[];
} = {}): Metadata {
	return {
		title,
		description,
		manifest: '/manifest.json',
		referrer: 'origin-when-cross-origin',
		keywords: [
			'digital note-taking',
			'best note-taking app',
			'cloud notes',
			'online note organizer',
			'AI-powered notes',
			'smart note management',
			'student productivity tools',
			'study planner app',
			'efficient note-taking',
			'cross-platform notes',
			'collaborative workspace',
			'team notes and collaboration',
			'encrypted note storage',
			'quick note capture',
			'mind mapping tool',
			'to-do list and notes',
			'task management with notes',
			'research and writing app',
			'academic note-taking app',
			'secure cloud notebook',
			'intelligent search for notes',
			'study and exam preparation app',
			'note-taking for professionals',
			'meeting notes organizer',
			'digital journal and planner',
			'AI notes assistant',
			'workflow optimization tool',
			'shared digital whiteboard',
			'voice-to-text note app',
			'notebook with cloud sync',
			'tagging system for notes',
			'document editing and notes',
			'structured note storage',
			'best app for students',
			'idea brainstorming tool',
			'efficient document organization',
			'project management with notes',
			'automated reminders and notes',
			'secure and private note app',
			'writing and research platform',
			'remote work productivity app',
			...keywords,
		],
		openGraph: {
			title,
			description,
			url,
			type,
			publishedTime,
			...(image && {
				images: [
					{
						url: image,
					},
				],
			}),
		},
		twitter: {
			title,
			description,
			...(image && {
				card: 'summary_large_image',
				images: [image],
			}),
			creator: constants.twitter_handle,
		},
		appleWebApp: {
			title,
			capable: true,
			startupImage: './apple-icon.png',
			statusBarStyle: 'default',
		},
		icons,
		alternates: {
			canonical: new URL(url),
		},
		metadataBase: new URL(url),
		...(noIndex && {
			robots: {
				index: false,
				follow: false,
			},
		}),
	};
}

export const generateViewport = (): Viewport => {
	return {
		width: 'device-width',
		initialScale: 1,
		maximumScale: 1,
	};
};
