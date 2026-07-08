'use client'

import {
	animate,
	createTimeline,
	remove as animeRemove,
	set as animeSet,
	stagger as animeStagger,
} from 'animejs'
import { useEffect, useRef, useState } from 'react'

type Star = {
	x: number
	y: number
	size: number
	opacity: number
	delay: number
}

// Anime.js v4 does not provide a default export. We build a small compatibility
// wrapper so existing code can keep using `anime(...)`, `anime.timeline(...)`,
// `anime.remove(...)`, and `anime.stagger(...)`.
const anime: any = Object.assign(animate, {
	timeline: createTimeline,
	remove: animeRemove,
	set: animeSet,
	stagger: animeStagger,
})

function usePrefersReducedMotion() {
	const [reducedMotion, setReducedMotion] = useState(false)

	useEffect(() => {
		if (typeof window === 'undefined') return
		const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
		setReducedMotion(mql.matches)

		const onChange = () => setReducedMotion(mql.matches)
		mql.addEventListener?.('change', onChange)

		return () => mql.removeEventListener?.('change', onChange)
	}, [])

	return reducedMotion
}

export default function GalaxyBackground() {
	const reducedMotion = usePrefersReducedMotion()
	const rootRef = useRef<HTMLDivElement | null>(null)

	const nebulaARef = useRef<HTMLDivElement | null>(null)
	const nebulaBRef = useRef<HTMLDivElement | null>(null)
	const nebulaCRef = useRef<HTMLDivElement | null>(null)

	const starElsRef = useRef<(HTMLDivElement | null)[]>([])

	const [stars, setStars] = useState<Star[]>([])

	useEffect(() => {
		if (typeof window === 'undefined') return

		const buildStars = () => {
			const w = window.innerWidth
			const h = window.innerHeight
			const count = Math.round(Math.min(420, Math.max(140, (w * h) / 8000)))

			const next: Star[] = []
			for (let i = 0; i < count; i++) {
				// Slightly bias toward the center for a nicer depth feel.
				const nx = (Math.random() * 2 - 1) * (w / 2)
				const ny = (Math.random() * 2 - 1) * (h / 2)
				const bias = 0.35 + Math.random() * 0.65

				const x = w / 2 + nx * bias
				const y = h / 2 + ny * bias

				next.push({
					x,
					y,
					size: Math.random() < 0.85 ? 1 : 2,
					opacity: 0.2 + Math.random() * 0.75,
					delay: Math.random() * 900,
				})
			}

			setStars(next)
		}

		buildStars()
		window.addEventListener('resize', buildStars)
		return () => window.removeEventListener('resize', buildStars)
	}, [])

	useEffect(() => {
		if (reducedMotion) return

		const nebulaTargets = [
			nebulaARef.current,
			nebulaBRef.current,
			nebulaCRef.current,
		].filter(Boolean) as HTMLDivElement[]

		const starsTargets = starElsRef.current.filter(Boolean) as HTMLDivElement[]
		if (!nebulaTargets.length || !starsTargets.length) return

		const nebulaTimeline = anime
			.timeline({
				loop: true,
				autoplay: true,
			})
			.add(
				{
					targets: nebulaARef.current,
					translateX: ['-2%', '2%'],
					translateY: ['-2%', '2%'],
					rotate: ['-1deg', '1deg'],
					opacity: [0.35, 0.75],
					duration: 7500,
					easing: 'easeInOutSine',
				},
				0
			)
			.add(
				{
					targets: nebulaBRef.current,
					translateX: ['3%', '-3%'],
					translateY: ['1%', '-1%'],
					rotate: ['1deg', '-1deg'],
					opacity: [0.15, 0.55],
					duration: 9000,
					easing: 'easeInOutSine',
				},
				0
			)
			.add(
				{
					targets: nebulaCRef.current,
					translateX: ['-1%', '1%'],
					translateY: ['3%', '-3%'],
					opacity: [0.1, 0.45],
					duration: 10500,
					easing: 'easeInOutSine',
				},
				0
			)

		anime({
			targets: starsTargets,
			opacity: [0.15, 1],
			scale: [0.8, 1.6],
			duration: 2200,
			delay: anime.stagger(12),
			loop: true,
			easing: 'easeInOutSine',
		})

		return () => {
			nebulaTimeline.pause()
			anime.remove(nebulaTargets)
			anime.remove(starsTargets)
		}
	}, [reducedMotion, stars.length])

	return (
		<div
			ref={rootRef}
			className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'
			aria-hidden='true'
		>
			{/* Base deep-space tone */}
			<div className='absolute inset-0 bg-black' />

			{/* Nebula layers (animated via Anime.js) */}
			<div
				ref={nebulaARef}
				className='absolute inset-[-10%] opacity-50 blur-2xl'
				style={{
					background:
						'radial-gradient(circle at 20% 25%, rgba(167,139,250,0.55) 0%, rgba(34,211,238,0.15) 35%, rgba(0,0,0,0) 70%)',
				}}
			/>
			<div
				ref={nebulaBRef}
				className='absolute inset-[-10%] opacity-30 blur-3xl'
				style={{
					background:
						'radial-gradient(circle at 70% 60%, rgba(34,211,238,0.45) 0%, rgba(167,139,250,0.18) 35%, rgba(0,0,0,0) 70%)',
				}}
			/>
			<div
				ref={nebulaCRef}
				className='absolute inset-[-10%] opacity-25 blur-[55px]'
				style={{
					background:
						'radial-gradient(circle at 45% 10%, rgba(167,139,250,0.35) 0%, rgba(34,211,238,0.1) 40%, rgba(0,0,0,0) 75%)',
				}}
			/>

			{/* Star field */}
			<div className='absolute inset-0'>
				{stars.map((s, i) => (
					<div
						key={i}
						ref={(el) => {
							starElsRef.current[i] = el
						}}
						className='absolute rounded-full bg-white'
						style={{
							left: s.x,
							top: s.y,
							width: s.size,
							height: s.size,
							opacity: s.opacity,
							transform: 'translate(-50%, -50%)',
							// give each star its own starting “moment”
							animationDelay: `${s.delay}ms`,
						}}
					/>
				))}
			</div>

			{/* Vignette for contrast */}
			<div
				className='absolute inset-0'
				style={{
					background:
						'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.8) 100%)',
				}}
			/>
		</div>
	)
}

