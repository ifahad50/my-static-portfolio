'use client'

import { useEffect, useRef } from 'react'
import { animate, remove as animeRemove } from 'animejs'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import SubHeading from './SubHeading'
import Link from 'next/link'
import type { ProjectType } from '@/types/project'
import GalaxyCard from './GalaxyCard'

function ProjectCard({ project, index }: { project: ProjectType; index: number }) {
	const cardRef = useRef<HTMLDivElement | null>(null)
	const observed = useRef(false)

	useEffect(() => {
		const el = cardRef.current
		if (!el) return
		el.style.opacity = '0'
		el.style.transform = 'translateY(28px)'

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting && !observed.current) {
					observed.current = true
					animate(el, {
						opacity: [0, 1],
						translateY: [28, 0],
						duration: 700,
						delay: index * 100,
						easing: 'easeOutCubic',
					})
					observer.disconnect()
				}
			},
			{ threshold: 0.12 }
		)
		observer.observe(el)
		return () => { observer.disconnect(); animeRemove(el) }
	}, [index])

	return (
		<div ref={cardRef} className='w-full md:w-[calc(33.333%-1rem)]'>
			<GalaxyCard className='flex flex-col h-full cursor-pointer group/card'>
				<Link href={`/projects/${project.slug}`} className='block overflow-hidden rounded-t-xl'>
					<img
						className='w-full h-[220px] object-cover transition-transform duration-500 group-hover/card:scale-105'
						src={project.headerImage}
						alt={project.title}
						width={400}
						height={220}
					/>
				</Link>

				<div className='flex flex-col flex-1 gap-3 p-4 md:p-5'>
					<Link href={`/projects/${project.slug}`}>
						<h3 className='text-base font-semibold text-white line-clamp-1 hover:text-white/70 transition-colors'>
							{project.title}
						</h3>
					</Link>

					<div className='h-px bg-white/[0.06]' />

					<p className='text-sm text-white/55 leading-relaxed line-clamp-5 flex-1'>
						{project.headerDescription}
					</p>

					<div className='flex items-center justify-between mt-auto pt-2'>
						<div className='flex flex-wrap gap-1'>
							{project.technologiesUsed?.slice(0, 3).map(t => (
								<span key={t} className='text-[10px] font-mono text-white/45 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-full'>
									{t}
								</span>
							))}
							{(project.technologiesUsed?.length ?? 0) > 3 && (
								<span className='text-[10px] font-mono text-white/30 px-1'>+{(project.technologiesUsed?.length ?? 0) - 3}</span>
							)}
						</div>
						<Link
							href={`/projects/${project.slug}`}
							className='flex items-center justify-center w-8 h-8 rounded-full bg-white/8 border border-white/15 text-white/60 hover:bg-white/15 hover:text-white transition-colors shrink-0'
						>
							<FaArrowUpRightFromSquare className='text-xs' />
						</Link>
					</div>
				</div>
			</GalaxyCard>
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
