'use client'

import { useEffect, useRef } from 'react'
import { animate, remove as animeRemove } from 'animejs'
import siteSettings from '@/site-setting'
import SubHeading from './SubHeading'

const total = siteSettings.workExperiences.length

function ExperienceCard({ experience, index }: { experience: typeof siteSettings.workExperiences[0]; index: number }) {
	const cardRef  = useRef<HTMLDivElement | null>(null)
	const observed = useRef(false)

	const isActive = experience.period.toLowerCase().includes('present')
	const period   = experience.period.replace(' - ', ' → ')
	const id       = `EXP_${String(index + 1).padStart(3, '0')}`

	useEffect(() => {
		const el = cardRef.current
		if (!el) return
		el.style.opacity = '0'
		el.style.transform = 'translateX(-28px)'

		const observer = new IntersectionObserver(entries => {
			if (entries[0]?.isIntersecting && !observed.current) {
				observed.current = true
				animate(el, {
					opacity:    [0, 1],
					translateX: [-28, 0],
					duration:   700,
					delay:      index * 90,
					easing:     'easeOutCubic',
				})
				observer.disconnect()
			}
		}, { threshold: 0.1 })

		observer.observe(el)
		return () => { observer.disconnect(); animeRemove(el) }
	}, [index])

	return (
		<div ref={cardRef} className='flex gap-5 md:gap-7'>

			{/* ── Timeline column ── */}
			<div className='flex flex-col items-center shrink-0'>
				{/* Active = solid white + outer ring. Past = hollow ring */}
				<div className={`
					mt-[26px] shrink-0 relative flex items-center justify-center
					w-3 h-3 rounded-full
					${isActive
						? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.55)] ring-2 ring-white/25'
						: 'border border-white/30 bg-transparent'}
				`}>
					{isActive && <div className='w-1 h-1 rounded-full bg-black' />}
				</div>
				{index < total - 1 && (
					<div className='flex-1 w-px bg-gradient-to-b from-white/20 via-white/8 to-transparent mt-1.5' />
				)}
			</div>

			{/* ── Card ── */}
			<div className='flex-1 pb-10'>
				<div className='
					relative rounded-xl border border-white/[0.07] bg-white/[0.03]
					backdrop-blur-xl overflow-hidden
					hover:border-white/[0.13] hover:bg-white/[0.05]
					transition-colors duration-300
				'>
					{/* Card top bar */}
					<div className='flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/[0.05]'>
						<span className='font-mono text-[9px] text-white/22 tracking-[0.22em]'>{id}</span>
						<span className={`
							font-mono text-[9px] tracking-[0.18em] px-2 py-0.5 rounded
							border ${isActive
								? 'text-white/80 border-white/25 bg-white/[0.06]'
								: 'text-white/25 border-white/[0.08]'}
						`}>
							{isActive ? '● ACTIVE' : '○ CLOSED'}
						</span>
					</div>

					<div className='p-5 md:p-6 space-y-4'>
						{/* Role + company + period */}
						<div className='flex flex-wrap items-start justify-between gap-3'>
							<div>
								<div className='flex items-center gap-2 mb-1'>
									<span className='font-mono text-white/28 text-sm select-none'>{'>'}</span>
									<h3 className='font-bold text-base md:text-[17px] text-white tracking-tight'>
										{experience.title}
									</h3>
								</div>
								<p className='font-mono text-[11px] text-white/40 pl-5'>
									@ {experience.company}
								</p>
							</div>
							<span className='font-mono text-[11px] text-white/38 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-md whitespace-nowrap shrink-0'>
								{period}
							</span>
						</div>

						{/* Description with left-border accent */}
						<p className='text-[13px] text-white/58 leading-relaxed border-l-2 border-white/[0.09] pl-3.5'>
							{experience.description}
						</p>

						{/* Tech stack */}
						<div className='space-y-2.5 pt-1'>
							<div className='flex items-center gap-2'>
								<span className='font-mono text-[9px] text-white/18 shrink-0 tracking-[0.12em]'>$ deps</span>
								<div className='flex-1 h-px bg-white/[0.05]' />
							</div>
							<div className='flex flex-wrap gap-1.5'>
								{experience.techStack.map(tech => (
									<span
										key={tech}
										className='font-mono text-[10px] text-white/44 bg-white/[0.04] border border-white/[0.07] px-2 py-0.5 rounded-md'
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
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
