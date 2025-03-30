import type { NextConfig } from 'next';
import './src/env';

const nextConfig: NextConfig = {
	transpilePackages: [
		'lucide-react',
		'@t3-oss/env-nextjs',
		'@t3-oss/env-core',
		'next-mdx-remote',
	],
	/* config options here */
	images: {
		remotePatterns: [
			{
				hostname: '**',
			},
		],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
} satisfies NextConfig;

export default nextConfig;
