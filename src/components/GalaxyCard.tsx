'use client'

import { animate, createTimeline, remove as animeRemove, set as animeSet, stagger as animeStagger } from 'animejs'
import { useEffect, useRef, useState } from 'react'

function usePrefersReducedMotion() {
	const [r, setR] = useState(false)
	useEffect(() => {
		if (typeof window === 'undefined') return
		const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
		setR(mql.matches)
		const fn = () => setR(mql.matches)
		mql.addEventListener?.('change', fn)
		return () => mql.removeEventListener?.('change', fn)
	}, [])
	return r
}

const anime: any = Object.assign(
	(p: any, q?: any) => {
		if (q === undefined && p && typeof p === 'object' && 'targets' in p) {
			const { targets, ...rest } = p
			return animate(targets, rest)
		}
		return animate(p, q)
	},
	{ timeline: createTimeline, remove: animeRemove, set: animeSet, stagger: animeStagger }
)

export default function GalaxyCard({
	children,
	className = '',
	accent = 'violet',
}: {
	children: React.ReactNode
	className?: string
	accent?: 'violet' | 'cyan' | 'none'
}) {
	const reducedMotion = usePrefersReducedMotion()
	const highlightRef = useRef<HTMLDivElement | null>(null)
	const borderRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!highlightRef.current) return
		highlightRef.current.style.opacity = '0'
		highlightRef.current.style.transform = 'translateX(-120%)'
	}, [])

	const triggerGlow = () => {
		if (reducedMotion) return
		if (!highlightRef.current) return

		anime.remove(highlightRef.current)
		anime({
			targets: highlightRef.current,
			opacity: [0, 1, 0],
			translateX: ['-120%', '120%'],
			duration: 1000,
			easing: 'easeInOutQuad',
		})

		if (borderRef.current) {
			anime.remove(borderRef.current)
			anime({
				targets: borderRef.current,
				opacity: [0, 1, 0],
				duration: 1000,
				easing: 'easeInOutQuad',
			})
		}
	}

	const sweepColor = 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0) 100%)'

	return (
		<div
			className={`group relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.055] ${className}`}
			onMouseEnter={triggerGlow}
			onFocusCapture={triggerGlow}
		>
			{/* Sweep glow */}
			<div
				ref={highlightRef}
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 opacity-0'
				style={{ background: sweepColor }}
			/>

			{/* Border pulse on hover */}
			<div
				ref={borderRef}
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 rounded-xl opacity-0'
				style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.18)' }}
			/>

			<div className='relative z-10'>{children}</div>
		</div>
	)
}
