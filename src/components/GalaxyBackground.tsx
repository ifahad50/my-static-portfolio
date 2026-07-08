'use client'

import { animate, remove as animeRemove, stagger as animeStagger } from 'animejs'
import { useEffect, useRef, useState } from 'react'

type Star    = { x: number; y: number; size: number }
type Shooter = { x: number; y: number; angle: number; length: number; delay: number }

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

// Stable shooter list — fixed positions, no randomness so they never regenerate
const SHOOTERS: Shooter[] = Array.from({ length: 6 }, (_, i) => ({
	x: 10 + i * 15,
	y: 5 + (i % 3) * 8,
	angle: 35 + (i % 2) * 10,
	length: 80 + (i % 3) * 60,
	delay: i * 3200,
}))

export default function GalaxyBackground() {
	const reducedMotion  = usePrefersReducedMotion()
	const nebulaARef     = useRef<HTMLDivElement | null>(null)
	const nebulaBRef     = useRef<HTMLDivElement | null>(null)
	const nebulaCRef     = useRef<HTMLDivElement | null>(null)
	const starElsRef     = useRef<(HTMLDivElement | null)[]>([])
	const shooterElsRef  = useRef<(HTMLDivElement | null)[]>([])
	const [stars, setStars] = useState<Star[]>([])

	// Generate stars once on mount; regenerate on resize
	useEffect(() => {
		if (typeof window === 'undefined') return
		const build = () => {
			const w = window.innerWidth
			const h = window.innerHeight
			const count = Math.round(Math.min(450, Math.max(160, (w * h) / 6500)))
			const next: Star[] = []
			for (let i = 0; i < count; i++) {
				const nx = (Math.random() * 2 - 1) * (w / 2)
				const ny = (Math.random() * 2 - 1) * (h / 2)
				const bias = 0.25 + Math.random() * 0.75
				next.push({
					x:    w / 2 + nx * bias,
					y:    h / 2 + ny * bias,
					size: Math.random() < 0.8 ? 1 : Math.random() < 0.5 ? 2 : 3,
				})
			}
			setStars(next)
		}
		build()
		window.addEventListener('resize', build)
		return () => window.removeEventListener('resize', build)
	}, [])

	// ── Nebula animation — isolated from star state so it never gets interrupted ──
	useEffect(() => {
		if (reducedMotion) return
		const layers = [
			{ el: nebulaARef.current, tx: ['-3%', '3%'] as [string,string],  ty: ['-2%', '2%'] as [string,string],  op: [0.3, 0.6]  as [number,number], dur: 8000  },
			{ el: nebulaBRef.current, tx: ['4%', '-4%'] as [string,string],   ty: ['1%', '-2%'] as [string,string],  op: [0.15, 0.45] as [number,number], dur: 10500 },
			{ el: nebulaCRef.current, tx: ['-1%', '2%'] as [string,string],   ty: ['3%', '-3%'] as [string,string],  op: [0.1, 0.35] as [number,number], dur: 12000 },
		].filter(l => l.el != null) as Array<{ el: HTMLDivElement; tx: [string,string]; ty: [string,string]; op: [number,number]; dur: number }>
		if (!layers.length) return

		const anims = layers.map(l =>
			animate(l.el, {
				translateX: l.tx, translateY: l.ty, opacity: l.op,
				duration: l.dur, easing: 'easeInOutSine', loop: true, direction: 'alternate',
			})
		)
		return () => {
			anims.forEach(a => a?.pause?.())
			animeRemove(layers.map(l => l.el))
		}
	}, [reducedMotion])

	// ── Star + shooter animations — run once stars are populated ──
	useEffect(() => {
		if (reducedMotion || !stars.length) return

		const starTargets    = starElsRef.current.filter(Boolean) as HTMLDivElement[]
		const shooterTargets = shooterElsRef.current.filter(Boolean) as HTMLDivElement[]

		// Breathing: keyframe cycle min→max→min so the loop point is seamless.
		// direction:'alternate' is avoided because it causes a blank flash when
		// all stars converge at minimum opacity simultaneously at the loop boundary.
		if (starTargets.length) {
			animate(starTargets, {
				opacity:  [0.22, 0.62, 0.22],
				duration: 9600,
				delay:    animeStagger(4),
				loop:     true,
				easing:   'easeInOutSine',
			})
		}

		// Shooting stars — stagger replaces the function callback that caused TS errors
		if (shooterTargets.length) {
			animate(shooterTargets, {
				translateX: [0, 300],
				translateY: [0, 180],
				opacity:    [{ value: [0, 0.7], duration: 200 }, { value: 0, duration: 400, delay: 200 }],
				duration:   800,
				delay:      animeStagger(3200),
				loop:       true,
				easing:     'easeOutQuad',
			})
		}

		return () => {
			animeRemove(starTargets)
			animeRemove(shooterTargets)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reducedMotion, stars.length > 0])

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
			{SHOOTERS.map((s, i) => (
				<div
					key={i}
					ref={el => { shooterElsRef.current[i] = el }}
					className='absolute opacity-0'
					style={{
						left:      `${s.x}%`,
						top:       `${s.y}%`,
						width:     s.length,
						height:    1,
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
							left:      s.x,
							top:       s.y,
							width:     s.size,
							height:    s.size,
							opacity:   0.22, // matches animation FROM value — no jump when anime.js takes over
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
					backgroundSize:  '80px 80px',
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
