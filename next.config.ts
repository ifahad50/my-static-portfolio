import type { NextConfig } from 'next'

// GitHub Pages (and any STATIC_EXPORT=1 build) needs a static `out/` directory.
// Local `next dev` / non-export builds keep server routes for Keystatic.
const isStaticExport =
	process.env.STATIC_EXPORT === '1' || process.env.GITHUB_ACTIONS === 'true'

const nextConfig: NextConfig = {
	output: isStaticExport ? 'export' : undefined,
	images: {
		unoptimized: true,
	},
	reactStrictMode: false,
	typescript: {
		ignoreBuildErrors: true,
	},
}

export default nextConfig
