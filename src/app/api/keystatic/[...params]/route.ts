import { makeRouteHandler } from '@keystatic/next/route-handler'
import config from '@/keystatic.config'

// In dev (output: undefined) this route is fully dynamic — all Keystatic API calls work.
// In production (output: 'export') the route is pre-rendered as static placeholders.
export function generateStaticParams() {
	return [{ params: ['tree'] }, { params: ['update'] }]
}

const handler = makeRouteHandler({ config })

export const POST = handler.POST
export const GET = handler.GET
