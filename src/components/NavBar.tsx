'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, GanttChart, BookOpen, Mail } from 'lucide-react'
import siteSettings from '@/site-setting'

const items = [
	{ icon: Home, label: 'Home', href: '/' },
	{ icon: GanttChart, label: 'Projects', href: '/projects' },
	{ icon: BookOpen, label: 'Blog', href: '/blog' },
	{ icon: Mail, label: 'Contact', href: siteSettings.contact.gmail },
]

export default function NavBar() {
	const pathname = usePathname()

	return (
		<nav className='fixed bottom-4 md:bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none'>
			<div className='pointer-events-auto flex items-center gap-1 px-3 py-2 rounded-2xl border border-white/[0.09] bg-black/60 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)]'>
				{items.map(({ icon: Icon, label, href }) => {
					const isActive = href === '/' ? pathname === '/' : pathname?.startsWith(href)
					const isExternal = href.startsWith('mailto:') || href.startsWith('http')
					return (
						<Link
							key={label}
							href={href}
							target={isExternal ? '_blank' : undefined}
							className={`relative flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-xl text-xs transition-all duration-200 ${
								isActive
									? 'text-white bg-white/15 border border-white/20'
									: 'text-white/40 hover:text-white/80 hover:bg-white/[0.06]'
							}`}
						>
							<Icon size={18} strokeWidth={isActive ? 2.2 : 1.6} />
							<span className={`text-[10px] ${isActive ? 'text-white' : 'text-white/30'}`}>{label}</span>
							{isActive && (
								<div className='absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)]' />
							)}
						</Link>
					)
				})}
			</div>
		</nav>
	)
}
