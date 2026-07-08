// In production (output: 'export'), we pre-generate only the /keystatic root page.
// In dev (output is undefined), all /keystatic/* routes work dynamically — no constraint.
export function generateStaticParams() {
	return [{ params: [] as string[] }]
}

export default function Page() {
	return null
}
