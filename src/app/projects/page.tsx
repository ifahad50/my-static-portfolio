'use client'
import Project from "@/components/Project"
import ProjectsSection from "@/components/ProjectsSection"
import { useSearchParams } from "next/navigation"


function Page() {
	const searchParams = useSearchParams()
	const slug = searchParams.get('slug')
	if (slug) {
		return <Project slug={slug} />
	}

	return <ProjectsSection />
}

export default Page
