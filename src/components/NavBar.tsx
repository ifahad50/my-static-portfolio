'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import siteSettings from '@/site-setting'

const NAV_LINKS = [
	{ label: 'home',     href: '/' },
	{ label: 'projects', href: '/projects' },
	{ label: 'blog',     href: '/blog' },
]

export default function NavBar() {
	const pathname  = usePathname()
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		const handle = () => setScrolled(window.scrollY > 24)
		handle()
		window.addEventListener('scroll', handle, { passive: true })
		return () => window.removeEventListener('scroll', handle)
	}, [])

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled ? 'border-b border-white/[0.06]' : 'border-b border-transparent'
			}`}
		>
			<div className={`transition-colors duration-300 ${scrolled ? 'bg-black/88 backdrop-blur-2xl' : 'bg-transparent'}`}>
				<div className='max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-4'>

					{/* ── Logo ── */}
					<Link href='/' className='flex items-center gap-3 shrink-0 group'>
						{/* Bracketed monogram */}
						<div className='relative flex items-center justify-center w-8 h-8 border border-white/[0.18] group-hover:border-white/40 transition-colors duration-200'>
							<span className='font-mono text-xs font-bold text-white/80 tracking-widest select-none'>FI</span>
							{/* Micro corner ticks — same HUD pattern as photo card */}
							<div className='absolute -top-[3px] -left-[3px] w-2 h-2 border-t border-l border-white/55' />
							<div className='absolute -top-[3px] -right-[3px] w-2 h-2 border-t border-r border-white/55' />
							<div className='absolute -bottom-[3px] -left-[3px] w-2 h-2 border-b border-l border-white/55' />
							<div className='absolute -bottom-[3px] -right-[3px] w-2 h-2 border-b border-r border-white/55' />
						</div>

						{/* Name — hidden below sm */}
						<div className='hidden sm:flex flex-col leading-none'>
							<span className='font-mono text-[11px] text-white/55 tracking-[0.18em] uppercase'>Fahad Iqbal</span>
							<span className='font-mono text-[8px] text-white/22 tracking-[0.14em] mt-0.5'>Full-Stack Developer</span>
						</div>
					</Link>

					{/* ── Nav links + contact ── */}
					<div className='flex items-center gap-0.5 sm:gap-1'>
						{NAV_LINKS.map(({ label, href }, i) => {
							const isActive = href === '/' ? pathname === '/' : pathname?.startsWith(href)
							return (
								<Link
									key={href}
									href={href}
									className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 font-mono text-[10px] sm:text-[11px] tracking-[0.08em] transition-colors duration-200 ${
										isActive ? 'text-white' : 'text-white/32 hover:text-white/68'
									}`}
								>
									<span className={`text-[8px] transition-colors duration-200 ${isActive ? 'text-white/35' : 'text-white/15'}`}>
										0{i + 1}.
									</span>
									{label}
									{/* Active underline */}
									{isActive && (
										<span className='absolute bottom-0 left-2.5 right-2.5 h-px bg-white/45' />
									)}
								</Link>
							)
						})}

						{/* Separator */}
						<div className='w-px h-4 bg-white/[0.08] mx-1 sm:mx-2' />

						{/* Contact CTA */}
						<a
							href={siteSettings.contact.gmail}
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center gap-1.5 font-mono text-[10px] text-white/42 hover:text-white/85 border border-white/[0.10] hover:border-white/28 px-2.5 sm:px-3 py-1.5 rounded transition-colors duration-200 tracking-[0.1em]'
						>
							<span className='text-white/20 select-none'>{'>'}</span>
							<span className='hidden xs:inline'>contact</span>
							<span className='xs:hidden'>@</span>
						</a>
					</div>
				</div>

				{/* Scrolled-state scanning underline */}
				{scrolled && (
					<div aria-hidden='true' className='absolute bottom-0 left-0 right-0 h-px overflow-hidden pointer-events-none'>
						<div
							className='h-full'
							style={{
								background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)',
								animation: 'load-shimmer 3.5s ease-in-out infinite',
							}}
						/>
					</div>
				)}
			</div>
		</nav>
	)
}
