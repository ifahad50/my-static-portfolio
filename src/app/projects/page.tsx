'use client'
import Project from "@/components/Project"
import ProjectsSection from "@/components/ProjectsSection"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"
import Loader from "../loading"


function ProjectsComponent() {
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

export default function Page() {
	return (
		<Suspense fallback={<Loader />}>
			<ProjectsComponent />
		</Suspense>
	);
}

