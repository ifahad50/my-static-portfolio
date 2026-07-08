import type { NextConfig } from 'next'

// Keystatic needs server-side route handlers (GET/POST) to function in production.
// Removing `output: 'export'` ensures your `/api/keystatic/*` routes accept writes.
const nextConfig = (): NextConfig => ({
	output: undefined,
	images: {
		unoptimized: true,
	},
	reactStrictMode: false,
	typescript: {
		ignoreBuildErrors: true,
	},
})

export default nextConfig
