import { constants } from '@/lib/constants';
import { getBaseUrl } from '@/utils/getBaseUrl';
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: constants.name,
		short_name: constants.name,
		id: '/',
		start_url: '/',
		display_override: ['window-controls-overlay'],
		description: constants.description,
		lang: 'en',
		scope: '/',
		related_applications: [{ platform: 'website', url: getBaseUrl() }],
		display: 'standalone',
		orientation: 'portrait',
		background_color: '#FFFFFF',
		theme_color: '#FFFFFF',
		icons: [
			{
				src: '/icon.png',
				type: 'image/png',
				sizes: '144x144',
				purpose: 'any',
			},
			{
				src: '/icon.png',
				type: 'image/png',
				sizes: '192x192',
				purpose: 'maskable',
			},
			{
				src: '/icon.png',
				type: 'image/png',
				sizes: '512x512',
				purpose: 'maskable',
			},
		],
	};
}
