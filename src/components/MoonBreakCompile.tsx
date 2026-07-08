'use client'

import { useEffect, useLayoutEffect, useRef, type RefObject, type CSSProperties } from 'react'
import Image from 'next/image'
import { animate, remove as animeRemove } from 'animejs'

const B = 20   // bracket arm length (px)
const T = 1.5  // bracket line thickness (px)

export default function MoonBreakCompile({ heroRef: _heroRef }: { heroRef?: RefObject<HTMLElement | null> }) {
	const floatRef = useRef<HTMLDivElement | null>(null)
	const tlRef    = useRef<HTMLDivElement | null>(null)
	const trRef    = useRef<HTMLDivElement | null>(null)
	const blRef    = useRef<HTMLDivElement | null>(null)
	const brRef    = useRef<HTMLDivElement | null>(null)

	// Set invisible BEFORE first paint so there's no flash, and do it imperatively
	// so React can't re-apply it on re-renders (unlike a JSX style prop).
	useLayoutEffect(() => {
		const el = floatRef.current
		if (el) el.style.opacity = '0'
		;[tlRef, trRef, blRef, brRef].forEach(r => {
			if (r.current) r.current.style.opacity = '0'
		})
	}, [])

	useEffect(() => {
		const el = floatRef.current
		if (!el) return

		// Entrance only — scale + fade, no position movement so card never overflows
		animate(el, {
			opacity:  [0, 1],
			scale:    [0.94, 1],
			duration: 1000,
			delay:    350,
			easing:   'easeOutCubic',
		})

		const brackets = [
			{ ref: tlRef, tx: '-6px', ty: '-6px' },
			{ ref: trRef, tx:  '6px', ty: '-6px' },
			{ ref: blRef, tx: '-6px', ty:  '6px' },
			{ ref: brRef, tx:  '6px', ty:  '6px' },
		]
		brackets.forEach(({ ref, tx, ty }, i) => {
			const b = ref.current
			if (!b) return
			animate(b, {
				opacity:    [0, 1],
				translateX: [tx, '0px'],
				translateY: [ty, '0px'],
				duration:   550,
				delay:      500 + i * 90,
				easing:     'easeOutQuad',
			})
		})

		return () => { animeRemove(el) }
	}, [])

	const bracketBase: CSSProperties = {
		position: 'absolute',
		width:    B,
		height:   B,
		// opacity intentionally NOT here — set imperatively in useLayoutEffect
		// so React re-renders cannot override anime.js's animated value
		zIndex:   10,
	}
	const bColor = `${T}px solid rgba(255,255,255,0.72)`

	return (
		// No style={{ opacity }} here — managed imperatively to survive re-renders
		<div ref={floatRef} className='relative select-none pointer-events-none'>

			{/* Ambient glow behind frame */}
			<div
				aria-hidden='true'
				className='absolute pointer-events-none'
				style={{
					inset:      '-28px',
					background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.07) 18%, rgba(255,255,255,0.014) 60%, transparent 80%)',
					filter:     'blur(24px)',
				}}
			/>

			{/* Frame + bracket container */}
			<div className='relative'>

				{/* Corner brackets — opacity managed imperatively, NOT in style prop */}
				<div ref={tlRef} aria-hidden='true' style={{ ...bracketBase, top: -6, left: -6,   borderTop: bColor,    borderLeft: bColor  }} />
				<div ref={trRef} aria-hidden='true' style={{ ...bracketBase, top: -6, right: -6,  borderTop: bColor,    borderRight: bColor }} />
				<div ref={blRef} aria-hidden='true' style={{ ...bracketBase, bottom: -6, left: -6,  borderBottom: bColor, borderLeft: bColor  }} />
				<div ref={brRef} aria-hidden='true' style={{ ...bracketBase, bottom: -6, right: -6, borderBottom: bColor, borderRight: bColor }} />

				{/* Top meta row */}
				<div className='absolute -top-[22px] left-0 right-0 flex justify-between select-none pointer-events-none'>
					<span className='font-mono text-[8px] text-white/25 tracking-[0.15em] uppercase'>TARGET / 001</span>
					<span className='font-mono text-[8px] text-white/25 tracking-[0.15em] uppercase'>SYD · 2024</span>
				</div>

				{/* Photo container */}
				<div
					className='relative overflow-hidden'
					style={{
						width:       'clamp(200px, 27vw, 350px)',
						aspectRatio: '3 / 4',
						border:      '1px solid rgba(255,255,255,0.11)',
					}}
				>
					<Image
						src='/header_image.jpeg'
						alt='Fahad Iqbal'
						fill
						priority
						className='object-cover object-center'
						style={{ filter: 'grayscale(100%) contrast(1.1) brightness(0.9)' }}
					/>

					{/* Horizontal scan line */}
					<div
						aria-hidden='true'
						className='absolute left-0 right-0 pointer-events-none'
						style={{
							height:     '2px',
							top:        0,
							background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.45) 25%, rgba(255,255,255,0.82) 50%, rgba(255,255,255,0.45) 75%, transparent 100%)',
							animation:  'photo-scan 3.8s ease-in-out infinite',
						}}
					/>

					{/* Bottom vignette */}
					<div
						aria-hidden='true'
						className='absolute bottom-0 left-0 right-0 pointer-events-none'
						style={{ height: '52%', background: 'linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.42) 52%, transparent 100%)' }}
					/>

					{/* Info overlay */}
					<div
						className='absolute bottom-0 left-0 right-0 px-3 py-2.5 select-none'
						style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
					>
						<div className='flex items-center justify-between mb-[3px]'>
							<span className='font-mono text-[10px] font-semibold text-white/82 tracking-wide'>FAHAD IQBAL</span>
							<span className='flex items-center gap-1.5'>
								<span
									className='block rounded-full bg-white/70'
									style={{ width: 5, height: 5, animation: 'dot-blink 1.8s ease-in-out infinite' }}
								/>
								<span className='font-mono text-[8px] text-white/42 tracking-[0.2em] uppercase'>ONLINE</span>
							</span>
						</div>
						<span className='font-mono text-[8px] text-white/28 tracking-wider'>ID:001 // SWE // v1.0.3</span>
					</div>
				</div>

				{/* Mid-point tick marks */}
				<div aria-hidden='true' className='absolute top-0 left-1/2 -translate-x-1/2 bg-white/22' style={{ width: 1, height: 6 }} />
				<div aria-hidden='true' className='absolute bottom-0 left-1/2 -translate-x-1/2 bg-white/22' style={{ width: 1, height: 6 }} />
				<div aria-hidden='true' className='absolute left-0 top-1/2 -translate-y-1/2 bg-white/22' style={{ width: 6, height: 1 }} />
				<div aria-hidden='true' className='absolute right-0 top-1/2 -translate-y-1/2 bg-white/22' style={{ width: 6, height: 1 }} />
			</div>
		</div>
	)
}
