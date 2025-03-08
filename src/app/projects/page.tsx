import type { Metadata } from 'next'
import ProjectsComponent from '@/components/ProjectsComponent'

export const metadata: Metadata = {
	title: 'Projects',
	openGraph: {
		images: ['/header_image.jpeg'],
	},
}

export default function Page() {
	return <ProjectsComponent />
}
