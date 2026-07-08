'use client'

import siteSettings from '@/site-setting'
import ContactBlocks from './ContactBlocks'
import MoonBreakCompile from './MoonBreakCompile'
import { useRef, useEffect } from 'react'
import { animate, stagger, remove as animeRemove } from 'animejs'

function HeroSection() {
	const heroRef     = useRef<HTMLDivElement | null>(null)
	const moonWrapRef = useRef<HTMLDivElement | null>(null)

	// Text element refs for staggered entrance
	const tagRef  = useRef<HTMLDivElement | null>(null)
	const nameRef = useRef<HTMLDivElement | null>(null)
	const roleRef = useRef<HTMLDivElement | null>(null)
	const divRef  = useRef<HTMLDivElement | null>(null)
	const descRef = useRef<HTMLParagraphElement | null>(null)
	const codeRef = useRef<HTMLDivElement | null>(null)
	const ctaRef  = useRef<HTMLDivElement | null>(null)

	// Entrance animation
	useEffect(() => {
		const els = [tagRef, nameRef, roleRef, divRef, descRef, codeRef, ctaRef]
			.map(r => r.current).filter(Boolean) as HTMLElement[]
		els.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(20px)' })
		animate(els, {
			opacity: [0, 1], translateY: [20, 0],
			duration: 780, delay: stagger(85, { start: 200 }), easing: 'easeOutCubic',
		})
		return () => { animeRemove(els) }
	}, [])

	// Scroll parallax: moon follows at ~32 % of scroll speed so it lags
	// behind the page and feels like it's floating in a different depth plane.
	useEffect(() => {
		const wrap = moonWrapRef.current
		if (!wrap) return
		let raf: number | null = null
		let baseTranslate = '-50%' // desktop: vertically centered

		const setBase = () => {
			baseTranslate = window.innerWidth >= 768 ? '-50%' : '0%'
		}
		setBase()
		window.addEventListener('resize', setBase)

		const tick = () => {
			raf = null
			const offset = window.scrollY * 0.32
			wrap.style.transform = `translateY(calc(${baseTranslate} + ${offset}px))`
		}
		const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick) }
		window.addEventListener('scroll', onScroll, { passive: true })

		return () => {
			window.removeEventListener('scroll', onScroll)
			window.removeEventListener('resize', setBase)
			if (raf) cancelAnimationFrame(raf)
		}
	}, [])

	return (
		<div
			ref={heroRef}
			className='relative min-h-screen overflow-visible'
		>
			{/* ── MOON (always absolute, behind content) ───── */}
			{/*  Mobile:   centered in hero, acts as background  */}
			{/*  Desktop:  anchored to right half, parallaxed    */}
			<div
				ref={moonWrapRef}
				className='
					pointer-events-none absolute z-0
					top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
					md:left-auto md:translate-x-0 md:right-[-2%]
				'
				style={{ willChange: 'transform' }}
			>
				<MoonBreakCompile />
			</div>

			{/* Gradient veil between moon and text on mobile */}
			<div className='absolute inset-0 z-[1] md:hidden pointer-events-none'
				style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.15) 70%, transparent 100%)' }}
			/>

			{/* ── TEXT CONTENT ──────────────────────────────── */}
			<div className='
				relative z-10
				flex flex-col gap-6 md:gap-7
				min-h-screen justify-center
				w-full md:max-w-[52%]
				pt-20 pb-28 md:py-0
				px-0
			'>
				{/* Terminal breadcrumb */}
				<div ref={tagRef} className='flex items-center gap-1.5 font-mono text-[11px] select-none text-white/28'>
					<span>~/portfolio</span>
					<span className='text-white/15 px-0.5'>$</span>
					<span className='text-white/45'>whoami</span>
				</div>

				{/* Name – large, tight */}
				<div ref={nameRef}>
					<h1
						className='font-extrabold tracking-tighter leading-[0.88] text-white'
						style={{ fontSize: 'clamp(2.8rem, 7.5vw, 5.5rem)' }}
					>
						Fahad<br />
						<span className='text-white/28'>Iqbal</span>
					</h1>
				</div>

				{/* Role + blinking cursor */}
				<div ref={roleRef} className='flex items-center gap-2 font-mono text-sm md:text-[15px]'>
					<span className='text-white/22 select-none'>{'>'}</span>
					<span className='text-white/70'>{siteSettings.position}</span>
					<span className='w-[2px] h-[1.1em] bg-white/55 inline-block animate-cursor-blink' />
				</div>

				{/* Rule */}
				<div ref={divRef} className='flex items-center gap-3'>
					<div className='w-8 h-px bg-white/18' />
					<span className='font-mono text-[10px] text-white/18 tracking-[0.2em] uppercase'>since 2019</span>
				</div>

				{/* Description */}
				<p ref={descRef} className='text-white/48 text-sm md:text-[15px] leading-relaxed max-w-[36rem]'>
					Designing and building production web applications, ERP integrations,
					and cloud infrastructure. Shipped real products at{' '}
					<span className='text-white/82 font-medium'>Deloitte</span> and{' '}
					<span className='text-white/82 font-medium'>International Salon Supplies</span>.
				</p>

				{/* Inline code block – tech stack as code */}
				<div
					ref={codeRef}
					className='font-mono text-[11px] md:text-xs bg-white/[0.022] border border-white/[0.055] rounded-lg px-4 py-3.5 space-y-[3px] max-w-[22rem]'
				>
					<p><span className='text-white/25'>const</span> <span className='text-white/55'>stack</span> <span className='text-white/20'>= {'{'}</span></p>
					<p className='pl-4 text-white/38'>&quot;Next.js&quot;, &quot;React&quot;, &quot;Node.js&quot;,</p>
					<p className='pl-4 text-white/38'>&quot;AWS&quot;, &quot;Docker&quot;, &quot;PostgreSQL&quot;</p>
					<p className='text-white/20'>{'}'}</p>
					<div className='flex gap-5 pt-2 border-t border-white/[0.05] text-white/28'>
						<span><b className='text-white/82 font-bold'>5+</b> yrs</span>
						<span><b className='text-white/82 font-bold'>50+</b> projects</span>
						<span><b className='text-white/82 font-bold'>3</b> companies</span>
					</div>
				</div>

				{/* CTAs */}
				<div ref={ctaRef}><ContactBlocks /></div>
			</div>
		</div>
	)
}

export default HeroSection
