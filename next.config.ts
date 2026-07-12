import type { NextConfig } from 'next'

// GitHub Pages needs a static `out/` directory. Local `next dev` keeps server
// routes for Keystatic (API routes are stripped only in the Pages workflow).
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
	eslint: {
		// Lint still runs; fail only on errors (warnings are allowed).
		ignoreDuringBuilds: false,
	},
}

export default nextConfig
