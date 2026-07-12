'use client'

import { recommendations, RecommendationType } from '@/recommendation-data'
import SubHeading from './SubHeading'
import { useEffect, useRef } from 'react'
import { animate, stagger, remove as animeRemove } from 'animejs'

export function RecommendationCard({ rec, index }: { rec: RecommendationType; index: number }) {
	const id = String(index + 1).padStart(3, '0')

	return (
		<div className='
			relative flex flex-col gap-4 p-5
			rounded-xl border border-white/[0.07] bg-white/[0.03]
			backdrop-blur-xl transition-colors duration-300
			hover:border-white/[0.14] hover:bg-white/[0.055]
			group overflow-hidden
		'>
			{/* Hover sweep */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'
				style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)' }}
			/>

			{/* Top row: opening quote + rec ID */}
			<div className='flex items-start justify-between'>
				<span className='font-mono text-[22px] leading-none text-white/12 select-none'>{'"'}</span>
				<span className='font-mono text-[9px] text-white/20 tracking-[0.22em] pt-1'>REC_{id}</span>
			</div>

			{/* Full recommendation text — no truncation */}
			<p className='text-[13px] text-white/58 leading-relaxed whitespace-pre-line'>
				{rec.recommendation}
			</p>

			{/* Separator */}
			<div className='flex items-center gap-2.5 mt-auto pt-1'>
				<div className='flex-1 h-px bg-white/[0.06]' />
				<span className='font-mono text-[8px] text-white/18 tracking-[0.18em] uppercase'>verified</span>
				<div className='w-4 h-px bg-white/[0.06]' />
			</div>

			{/* Person */}
			<div className='flex items-center gap-3'>
				<div className='relative shrink-0'>
					<img
						className='w-9 h-9 rounded-full object-cover border border-white/10'
						style={{ filter: 'grayscale(100%) contrast(1.05)' }}
						src={rec.image}
						alt={rec.name}
					/>
					<span className='absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-white/70 border border-black' />
				</div>
				<div className='min-w-0'>
					<p className='text-[13px] font-semibold text-white/88 truncate'>{rec.name}</p>
					<p className='text-[10px] text-white/36 leading-tight'>{rec.designation}</p>
				</div>
			</div>
		</div>
	)
}

function RecommendationsSection() {
	const colRef   = useRef<HTMLDivElement | null>(null)
	const observed = useRef(false)

	useEffect(() => {
		const el = colRef.current
		if (!el) return
		// Children are the break-inside-avoid wrappers, one per card
		const wrappers = Array.from(el.children) as HTMLElement[]
		wrappers.forEach(w => { w.style.opacity = '0'; w.style.transform = 'translateY(28px)' })

		const observer = new IntersectionObserver(entries => {
			if (entries[0]?.isIntersecting && !observed.current) {
				observed.current = true
				animate(wrappers, {
					opacity:    [0, 1],
					translateY: [28, 0],
					duration:   640,
					delay:      stagger(70, { start: 60 }),
					easing:     'easeOutCubic',
				})
				observer.disconnect()
			}
		}, { threshold: 0.05 })

		observer.observe(el)
		return () => { observer.disconnect(); animeRemove(wrappers) }
	}, [])

	return (
		<div className='w-full flex flex-col items-center'>
			<SubHeading text='Recommendations' />

			{/*
			  CSS columns (masonry-style): cards flow top-to-bottom within each
			  column so long and short quotes share vertical space naturally.
			  No height equalisation needed — every word is visible.
			*/}
			<div
				ref={colRef}
				className='columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-5 w-full'
			>
				{recommendations.map((rec, i) => (
					<div key={rec.name} className='break-inside-avoid mb-4 md:mb-5'>
						<RecommendationCard rec={rec} index={i} />
					</div>
				))}
			</div>
		</div>
	)
}

export default RecommendationsSection
