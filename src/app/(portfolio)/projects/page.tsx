import type { Metadata } from 'next'
import ProjectsSection from '@/components/ProjectsSection'
import { getAllProjects } from '@/lib/keystatic'

export const metadata: Metadata = {
	title: 'Projects',
	openGraph: {
		images: ['/header_image.jpeg'],
	},
}

export default async function Page() {
	const projects = await getAllProjects()
	return <ProjectsSection projects={projects} />
}
