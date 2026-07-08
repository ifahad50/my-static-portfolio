'use client'

import { animate, createTimeline, remove as animeRemove, set as animeSet, stagger as animeStagger } from 'animejs'
import { useEffect, useRef, useState } from 'react'

type Star = { x: number; y: number; size: number; opacity: number; delay: number }
type Shooter = { x: number; y: number; angle: number; length: number; delay: number }

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

export default function GalaxyBackground() {
	const reducedMotion = usePrefersReducedMotion()
	const nebulaARef = useRef<HTMLDivElement | null>(null)
	const nebulaBRef = useRef<HTMLDivElement | null>(null)
	const nebulaCRef = useRef<HTMLDivElement | null>(null)
	const starElsRef = useRef<(HTMLDivElement | null)[]>([])
	const shooterElsRef = useRef<(HTMLDivElement | null)[]>([])
	const [stars, setStars] = useState<Star[]>([])
	const [shooters] = useState<Shooter[]>(() =>
		Array.from({ length: 6 }, (_, i) => ({
			x: 10 + i * 15,
			y: 5 + (i % 3) * 8,
			angle: 35 + (i % 2) * 10,
			length: 80 + (i % 3) * 60,
			delay: i * 3200,
		}))
	)

	useEffect(() => {
		if (typeof window === 'undefined') return
		const build = () => {
			const w = window.innerWidth
			const h = window.innerHeight
			const count = Math.round(Math.min(500, Math.max(180, (w * h) / 6000)))
			const next: Star[] = []
			for (let i = 0; i < count; i++) {
				const nx = (Math.random() * 2 - 1) * (w / 2)
				const ny = (Math.random() * 2 - 1) * (h / 2)
				const bias = 0.25 + Math.random() * 0.75
				next.push({
					x: w / 2 + nx * bias,
					y: h / 2 + ny * bias,
					size: Math.random() < 0.8 ? 1 : Math.random() < 0.5 ? 2 : 3,
					opacity: 0.15 + Math.random() * 0.8,
					delay: Math.random() * 1200,
				})
			}
			setStars(next)
		}
		build()
		window.addEventListener('resize', build)
		return () => window.removeEventListener('resize', build)
	}, [])

	useEffect(() => {
		if (reducedMotion) return

		const layers = [
			{ el: nebulaARef.current, tx: ['-3%', '3%'] as [string,string], ty: ['-2%', '2%'] as [string,string], op: [0.3, 0.6] as [number,number], dur: 8000 },
			{ el: nebulaBRef.current, tx: ['4%', '-4%'] as [string,string], ty: ['1%', '-2%'] as [string,string], op: [0.15, 0.45] as [number,number], dur: 10500 },
			{ el: nebulaCRef.current, tx: ['-1%', '2%'] as [string,string], ty: ['3%', '-3%'] as [string,string], op: [0.1, 0.35] as [number,number], dur: 12000 },
		].filter(l => l.el) as Array<{ el: HTMLDivElement; tx: [string,string]; ty: [string,string]; op: [number,number]; dur: number }>

		const starTargets = starElsRef.current.filter(Boolean) as HTMLDivElement[]
		if (!layers.length) return

		const anims = layers.map(l =>
			anime({ targets: l.el, translateX: l.tx, translateY: l.ty, opacity: l.op, duration: l.dur, easing: 'easeInOutSine', loop: true, direction: 'alternate' })
		)

		if (starTargets.length) {
			anime({ targets: starTargets, opacity: [0.08, 1], scale: [0.7, 1.8], duration: 2500, delay: (_: unknown, i: number) => 8 + i * 10, loop: true, easing: 'easeInOutSine' })
		}

		const shooterTargets = shooterElsRef.current.filter(Boolean) as HTMLDivElement[]
		if (shooterTargets.length) {
			anime({
				targets: shooterTargets,
				translateX: [0, 300],
				translateY: [0, 180],
				opacity: [{ value: [0, 0.7], duration: 200 }, { value: 0, duration: 400, delay: 200 }],
				duration: 800,
				delay: (_: unknown, i: number) => shooters[i]?.delay ?? i * 3000,
				loop: true,
				easing: 'easeOutQuad',
			})
		}

		return () => {
			anims.forEach(a => a?.pause?.())
			anime.remove(layers.map(l => l.el))
			anime.remove(starTargets)
			anime.remove(shooterTargets)
		}
	}, [reducedMotion, stars.length, shooters])

	return (
		<div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none' aria-hidden='true'>
			{/* Deep space base */}
			<div className='absolute inset-0 bg-black' />

			{/* Nebula A – subtle white cloud top-left */}
			<div
				ref={nebulaARef}
				className='absolute inset-[-12%] opacity-40 blur-3xl'
				style={{ background: 'radial-gradient(ellipse at 18% 22%, rgba(255,255,255,0.18) 0%, rgba(200,200,200,0.06) 40%, transparent 70%)' }}
			/>

			{/* Nebula B – grey cloud bottom-right */}
			<div
				ref={nebulaBRef}
				className='absolute inset-[-12%] opacity-25 blur-[60px]'
				style={{ background: 'radial-gradient(ellipse at 78% 68%, rgba(255,255,255,0.14) 0%, rgba(180,180,180,0.04) 45%, transparent 72%)' }}
			/>

			{/* Nebula C – centre hint */}
			<div
				ref={nebulaCRef}
				className='absolute inset-[-12%] opacity-20 blur-[80px]'
				style={{ background: 'radial-gradient(ellipse at 50% 15%, rgba(255,255,255,0.12) 0%, transparent 65%)' }}
			/>

			{/* Shooting stars */}
			{shooters.map((s, i) => (
				<div
					key={i}
					ref={el => { shooterElsRef.current[i] = el }}
					className='absolute opacity-0'
					style={{
						left: `${s.x}%`,
						top: `${s.y}%`,
						width: s.length,
						height: 1,
						transform: `rotate(${s.angle}deg)`,
						background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.4) 80%, rgba(255,255,255,0) 100%)',
						borderRadius: 4,
					}}
				/>
			))}

			{/* Star field */}
			<div className='absolute inset-0'>
				{stars.map((s, i) => (
					<div
						key={i}
						ref={el => { starElsRef.current[i] = el }}
						className='absolute rounded-full bg-white'
						style={{
							left: s.x,
							top: s.y,
							width: s.size,
							height: s.size,
							opacity: s.opacity,
							transform: 'translate(-50%, -50%)',
						}}
					/>
				))}
			</div>

			{/* Subtle grid overlay */}
			<div
				className='absolute inset-0 opacity-[0.018]'
				style={{
					backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
					backgroundSize: '80px 80px',
				}}
			/>

			{/* Edge vignette */}
			<div
				className='absolute inset-0'
				style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.92) 100%)' }}
			/>
		</div>
	)
}
