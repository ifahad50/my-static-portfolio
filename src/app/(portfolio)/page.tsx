import HomeContent from '@/components/HomeContent'
import { getAllProjects } from '@/lib/keystatic'

export default async function Home() {
	const projects = await getAllProjects()
	return <HomeContent projects={projects} />
}
