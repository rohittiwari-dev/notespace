import type { NextConfig } from "next";

const getAllAllowedEnvironmentVariables = () => {
	let out = Object.entries(process.env).reduce(
		(vars, [name, value]) =>
			/^(?:__|NODE_)/.test(name) ? vars : { ...vars, [name]: value },
		{},
	);
	delete (out as any)["NEXT_RUNTIME"];
	return out;
};

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		unoptimized: true,
	},
	env: {
		...getAllAllowedEnvironmentVariables(),
	},
};

export default nextConfig;
