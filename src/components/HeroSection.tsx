'use client'

import siteSettings from '@/site-setting'
import ContactBlocks from './ContactBlocks'
import MoonBreakCompile from './MoonBreakCompile'
import { useRef, useEffect } from 'react'
import { animate, stagger, remove as animeRemove } from 'animejs'

function HeroSection() {
	const heroRef     = useRef<HTMLDivElement | null>(null)
	const moonWrapRef = useRef<HTMLDivElement | null>(null)

	const tagRef  = useRef<HTMLDivElement | null>(null)
	const nameRef = useRef<HTMLDivElement | null>(null)
	const roleRef = useRef<HTMLDivElement | null>(null)
	const divRef  = useRef<HTMLDivElement | null>(null)
	const descRef = useRef<HTMLParagraphElement | null>(null)
	const codeRef = useRef<HTMLDivElement | null>(null)
	const ctaRef  = useRef<HTMLDivElement | null>(null)

	// Staggered entrance for text elements
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

	// Scroll parallax — desktop only.
	// On mobile the photo is in normal document flow (stacked above text),
	// so no transform is applied and no parallax runs.
	useEffect(() => {
		const wrap = moonWrapRef.current
		if (!wrap) return
		let raf: number | null = null

		const isMd = () => window.innerWidth >= 768

		// When resizing to mobile clear any desktop transform that was set
		const onResize = () => {
			if (!isMd()) wrap.style.transform = ''
		}
		window.addEventListener('resize', onResize)

		const tick = () => {
			raf = null
			if (!isMd()) return
			wrap.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.32}px))`
		}
		const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick) }
		window.addEventListener('scroll', onScroll, { passive: true })

		// Set initial desktop centering without waiting for a scroll event
		if (isMd()) wrap.style.transform = 'translateY(-50%)'

		return () => {
			window.removeEventListener('scroll', onScroll)
			window.removeEventListener('resize', onResize)
			if (raf) cancelAnimationFrame(raf)
		}
	}, [])

	return (
		// flex-col on mobile (photo stacked above text)
		// block on md+ (photo re-enters absolute flow on the right)
		<div ref={heroRef} className='flex flex-col md:block relative min-h-screen'>

			{/* ── PHOTO CARD ──────────────────────────────────────────
			    Mobile  : in normal flow, centred above the text block
			    Desktop : absolute right side, parallaxed by the effect above
			──────────────────────────────────────────────────────── */}
			<div
				ref={moonWrapRef}
				className='
					flex justify-center items-center
					pt-8 pb-6
					md:pt-0 md:pb-0
					md:absolute md:top-1/2 md:right-[-2%]
					md:pointer-events-none md:z-0
				'
				style={{ willChange: 'transform' }}
			>
				<MoonBreakCompile />
			</div>

			{/* ── TEXT CONTENT ──────────────────────────────────────── */}
			<div className='
				flex flex-col gap-6 md:gap-7
				w-full md:max-w-[52%]
				pb-16 md:min-h-screen md:justify-center md:py-0
				relative z-10
			'>
				{/* Terminal breadcrumb */}
				<div ref={tagRef} className='flex items-center gap-1.5 font-mono text-[11px] select-none text-white/28'>
					<span>~/portfolio</span>
					<span className='text-white/15 px-0.5'>$</span>
					<span className='text-white/45'>whoami</span>
				</div>

				{/* Name */}
				<div ref={nameRef}>
					<h1
						className='font-extrabold tracking-tighter leading-[0.88] text-white'
						style={{ fontSize: 'clamp(2.6rem, 7.5vw, 5.5rem)' }}
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

				{/* Code block */}
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
