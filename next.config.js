import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const jiti = createJiti(fileURLToPath(import.meta.url));

await jiti.import("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ["lucide-react", "@t3-oss/env-nextjs"],
	/* config options here */
	images: {
		unoptimized: true,
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
};

export default nextConfig;
