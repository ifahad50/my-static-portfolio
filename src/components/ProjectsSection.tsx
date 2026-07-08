'use client'

import { useEffect, useRef } from 'react'
import { animate, remove as animeRemove } from 'animejs'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import SubHeading from './SubHeading'
import Link from 'next/link'
import type { ProjectType } from '@/types/project'

function ProjectCard({ project, index }: { project: ProjectType; index: number }) {
	const cardRef  = useRef<HTMLDivElement | null>(null)
	const observed = useRef(false)
	const id       = `PRJ_${String(index + 1).padStart(3, '0')}`

	useEffect(() => {
		const el = cardRef.current
		if (!el) return
		el.style.opacity = '0'
		el.style.transform = 'translateY(30px)'

		const observer = new IntersectionObserver(entries => {
			if (entries[0]?.isIntersecting && !observed.current) {
				observed.current = true
				animate(el, {
					opacity:    [0, 1],
					translateY: [30, 0],
					duration:   680,
					delay:      index * 90,
					easing:     'easeOutCubic',
				})
				observer.disconnect()
			}
		}, { threshold: 0.1 })

		observer.observe(el)
		return () => { observer.disconnect(); animeRemove(el) }
	}, [index])

	const extraCount = (project.technologiesUsed?.length ?? 0) - 3

	return (
		<div ref={cardRef} className='w-full md:w-[calc(33.333%-1rem)]'>
			<div className='
				relative flex flex-col h-full rounded-xl overflow-hidden
				border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl
				hover:border-white/[0.14] hover:bg-white/[0.05]
				transition-colors duration-300 group/card
			'>

				{/* ── Image with HUD overlays ── */}
				<Link href={`/projects/${project.slug}`} className='relative block overflow-hidden shrink-0'>
					<img
						className='w-full h-[200px] object-cover transition-transform duration-500 group-hover/card:scale-105'
						src={project.headerImage}
						alt={project.title}
						width={400}
						height={200}
					/>
					{/* Darkening gradient */}
					<div
						aria-hidden='true'
						className='absolute inset-0'
						style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 55%, rgba(0,0,0,0.28) 100%)' }}
					/>
					{/* Top-left project ID */}
					<span className='absolute top-2.5 left-3 font-mono text-[9px] text-white/65 tracking-[0.2em] bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded border border-white/[0.12]'>
						{id}
					</span>
					{/* Top-right status */}
					<span className='absolute top-2.5 right-3 font-mono text-[9px] text-white/55 tracking-[0.15em] bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded border border-white/[0.12] flex items-center gap-1.5'>
						<span className='w-1.5 h-1.5 rounded-full bg-white/70 inline-block' />
						LIVE
					</span>
					{/* Bottom edge line */}
					<div aria-hidden='true' className='absolute bottom-0 left-0 right-0 h-px bg-white/[0.08]' />
				</Link>

				{/* ── Body ── */}
				<div className='flex flex-col flex-1 gap-3 p-4 md:p-5'>

					{/* Title with terminal prompt */}
					<Link href={`/projects/${project.slug}`} className='group/title'>
						<div className='flex items-baseline gap-2'>
							<span className='font-mono text-white/25 text-sm shrink-0 select-none'>{'>'}</span>
							<h3 className='text-[14px] font-semibold text-white/90 line-clamp-1 group-hover/title:text-white/60 transition-colors'>
								{project.title}
							</h3>
						</div>
					</Link>

					<div className='h-px bg-white/[0.05]' />

					{/* Description */}
					<p className='text-[12px] text-white/50 leading-relaxed line-clamp-3 flex-1 border-l border-white/[0.07] pl-2.5'>
						{project.headerDescription}
					</p>

					{/* Footer: tech pills + open button */}
					<div className='flex items-center justify-between gap-2 pt-1 mt-auto'>
						<div className='flex flex-wrap gap-1 min-w-0'>
							{project.technologiesUsed?.slice(0, 3).map(t => (
								<span
									key={t}
									className='font-mono text-[9px] text-white/40 bg-white/[0.04] border border-white/[0.07] px-1.5 py-0.5 rounded'
								>
									{t}
								</span>
							))}
							{extraCount > 0 && (
								<span className='font-mono text-[9px] text-white/22 px-1 self-center'>
									+{extraCount}
								</span>
							)}
						</div>
						<Link
							href={`/projects/${project.slug}`}
							className='flex items-center gap-1.5 font-mono text-[10px] text-white/40 hover:text-white/80 border border-white/[0.08] hover:border-white/20 px-2.5 py-1.5 rounded transition-colors shrink-0'
						>
							open <FaArrowUpRightFromSquare className='text-[8px]' />
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

function ProjectsSection({ projects }: { projects: ProjectType[] }) {
	return (
		<div className='flex flex-col gap-2 md:gap-4'>
			<SubHeading text='Projects' />
			<div className='flex flex-wrap gap-4 justify-center'>
				{projects.map((project, i) => (
					<ProjectCard key={project.slug} project={project} index={i} />
				))}
			</div>
		</div>
	)
}

export default ProjectsSection
