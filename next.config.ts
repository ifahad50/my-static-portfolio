import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	output: 'export',
	images: {
		unoptimized: true,
	},
	reactStrictMode: false,
	typescript: {
		ignoreBuildErrors: true,
	},
}

export default nextConfig
