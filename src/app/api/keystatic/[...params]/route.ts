import { makeRouteHandler } from '@keystatic/next/route-handler'
import config from '@/keystatic.config'

// Ensure this route is treated as a dynamic server endpoint.
// If it's pre-rendered, POST requests during "create/edit" will fail with 405.
export const dynamic = 'force-dynamic'

const handler = makeRouteHandler({ config })

export const POST = handler.POST
export const GET = handler.GET
