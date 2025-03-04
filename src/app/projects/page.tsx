'use client'
import Project from "@/components/Project"
import ProjectsSection from "@/components/ProjectsSection"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Loader from "../loading"


function ProjectsComponent() {
	const searchParams = useSearchParams()
	const slug = searchParams.get('slug')
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

