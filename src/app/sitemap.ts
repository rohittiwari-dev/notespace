import type { MetadataRoute } from 'next';

import { getBaseUrl } from '@/utils/getBaseUrl';

export default function sitemap(): MetadataRoute.Sitemap {
	const docs = [
		{
			url: `${getBaseUrl()}}`,
			lastModified: new Date().toISOString().split('T')[0],
		},
		{
			url: `${getBaseUrl()}}/sign-in`,
			lastModified: new Date().toISOString().split('T')[0],
		},
		{
			url: `${getBaseUrl()}}/sign-up`,
			lastModified: new Date().toISOString().split('T')[0],
		},
	];
	return [...docs];
}
