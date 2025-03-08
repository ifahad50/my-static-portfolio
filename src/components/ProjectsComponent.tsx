'use client'
import Loader from '@/app/loading'
import NotFound from '@/app/not-found'
import Project from '@/components/Project'
import ProjectsSection from '@/components/ProjectsSection'
import { projects, ProjectType } from '@/projects-data'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

function ProjectsFragment() {
	const searchParams = useSearchParams()
	const slug = searchParams.get('slug')

	useEffect(() => {
		//navigate to top
		window.scrollTo(0, 0)
	}, [slug])

	if (slug) {
		const foundProject: ProjectType | undefined = projects.find(
			(project: any) => project.slug === slug
		)
		if (!foundProject) {
			return <NotFound />
		}

		return <Project project={foundProject} />
	}

	return <ProjectsSection />
}

export default function ProjectsComponent() {
	return (
		<Suspense fallback={<Loader />}>
			<ProjectsFragment />
		</Suspense>
	)
}
