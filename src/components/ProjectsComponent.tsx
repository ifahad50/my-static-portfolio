'use client'
import Loader from '@/app/loading'
import Project from '@/components/Project'
import ProjectsSection from '@/components/ProjectsSection'
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
		return <Project slug={slug} />
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
