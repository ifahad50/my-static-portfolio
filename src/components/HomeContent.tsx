'use client'

import HeroSection from '@/components/HeroSection'
import ProjectsSection from '@/components/ProjectsSection'
import RecommendationsSection from '@/components/RecommendationsSection'
import SkillsSection from '@/components/SkillsSection'
import WorkExperienceSection from '@/components/WorkExperienceSection'
import type { ProjectType } from '@/types/project'

export default function HomeContent({ projects }: { projects: ProjectType[] }) {
	return (
		<div className='space-y-4'>
			<HeroSection />
			<RecommendationsSection />
			<SkillsSection />
			<WorkExperienceSection />
			<ProjectsSection projects={projects} />
		</div>
	)
}
