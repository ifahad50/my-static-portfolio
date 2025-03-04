'use client'
import HeroSection from '@/components/HeroSection'
import ProjectsSection from '@/components/ProjectsSection'
import SkillsSection from '@/components/SkillsSection'
import WorkExperienceSection from '@/components/WorkExperienceSection'
import { useEffect, useState } from 'react'

export default function Home() {
	const [isBottom, setIsBottom] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY
			const windowHeight = window.innerHeight
			const documentHeight = document.documentElement.scrollHeight
			setIsBottom(scrollTop + windowHeight >= documentHeight - 50)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])
	return (
		<>
			<div>
				<HeroSection />
				<SkillsSection />
				<WorkExperienceSection />
				<ProjectsSection />
			</div>
			<div
				className='fixed -bottom-7 left-0 w-full z-40'
				style={{
					boxShadow: isBottom
						? '0px -3px 10px rgba(0,0,0,0.1)'
						: '-27px -3px 391px 150px rgba(0,0,0,0.8)',
					WebkitBoxShadow: isBottom
						? '0px -3px 10px rgba(0,0,0,0.1)'
						: '-27px -3px 391px 150px rgba(0,0,0,0.8)',
					MozBoxShadow: isBottom
						? '0px -3px 10px rgba(0,0,0,0.1)'
						: '-27px -3px 391px 150px rgba(0,0,0,0.8)',
				}}
			></div>
		</>
	)
}
