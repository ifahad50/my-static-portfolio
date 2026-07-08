import type { NextConfig } from 'next'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'

const nextConfig = (phase: string): NextConfig => ({
	output: phase === PHASE_PRODUCTION_BUILD ? 'export' : undefined,
	images: {
		unoptimized: true,
	},
	reactStrictMode: false,
	typescript: {
		ignoreBuildErrors: true,
	},
})

export default nextConfig
