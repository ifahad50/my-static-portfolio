'use client'

import { useEffect, useRef } from 'react'
import { animate, remove as animeRemove } from 'animejs'
import siteSettings from '@/site-setting'
import SubHeading from './SubHeading'
import GalaxyCard from './GalaxyCard'

function ExperienceCard({ experience, index }: { experience: typeof siteSettings.workExperiences[0]; index: number }) {
	const cardRef = useRef<HTMLDivElement | null>(null)
	const observed = useRef(false)

	useEffect(() => {
		const el = cardRef.current
		if (!el) return
		el.style.opacity = '0'
		el.style.transform = 'translateX(-24px)'

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting && !observed.current) {
					observed.current = true
					animate(el, {
						opacity: [0, 1],
						translateX: [-24, 0],
						duration: 700,
						delay: index * 80,
						easing: 'easeOutCubic',
					})
					observer.disconnect()
				}
			},
			{ threshold: 0.15 }
		)
		observer.observe(el)
		return () => { observer.disconnect(); animeRemove(el) }
	}, [index])

	return (
		<div ref={cardRef} className='flex gap-4 md:gap-6'>
			{/* Timeline dot + line */}
			<div className='flex flex-col items-center shrink-0'>
				<div className='w-3 h-3 rounded-full bg-white border-2 border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.4)] mt-6 shrink-0' />
				{index < siteSettings.workExperiences.length - 1 && (
					<div className='flex-1 w-px bg-gradient-to-b from-white/25 via-white/10 to-transparent mt-2' />
				)}
			</div>

			{/* Card */}
			<div className='flex-1 pb-10'>
				<GalaxyCard className='p-5 md:p-6 space-y-3'>
					{/* Header row */}
					<div className='flex flex-wrap items-start justify-between gap-2'>
						<div>
							<h3 className='font-bold text-lg text-white'>{experience.title}</h3>
							<p className='text-white/60 font-medium text-sm'>{experience.company}</p>
						</div>
						<span className='font-mono text-xs text-white/50 bg-white/5 border border-white/10 px-2 py-1 rounded-md whitespace-nowrap'>
							{experience.period}
						</span>
					</div>

					<hr className='border-white/[0.06]' />

					<p className='text-white/65 text-sm leading-relaxed'>{experience.description}</p>

					{/* Tech stack */}
					<div className='flex flex-wrap gap-1.5 pt-1'>
						{experience.techStack.map((tech) => (
							<span
								key={tech}
								className='text-[11px] font-mono text-white/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full'
							>
								{tech}
							</span>
						))}
					</div>
				</GalaxyCard>
			</div>
		</div>
	)
}

function WorkExperienceSection() {
	return (
		<div className='w-full'>
			<SubHeading text='Work Experience' />
			<div className='max-w-3xl mx-auto'>
				{siteSettings.workExperiences.map((exp, i) => (
					<ExperienceCard key={`exp-${i}`} experience={exp} index={i} />
				))}
			</div>
		</div>
	)
}

export default WorkExperienceSection
