'use client'

import {
	animate,
	createTimeline,
	remove as animeRemove,
	set as animeSet,
	stagger as animeStagger,
} from 'animejs'
import { useEffect, useRef, useState } from 'react'

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

const anime: any = Object.assign(animate, {
	timeline: createTimeline,
	remove: animeRemove,
	set: animeSet,
	stagger: animeStagger,
})

export default function GalaxyCard({
	children,
	className = '',
}: {
	children: React.ReactNode
	className?: string
}) {
	const reducedMotion = usePrefersReducedMotion()
	const highlightRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!highlightRef.current) return
		// Ensure the glow starts off-screen (so the first hover looks intentional).
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
			duration: 900,
			easing: 'easeInOutQuad',
		})
	}

	return (
		<div
			className={`group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-lg ${className}`}
			onMouseEnter={triggerGlow}
			onFocusCapture={triggerGlow}
		>
			{/* Galaxy glow sweep */}
			<div
				ref={highlightRef}
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 opacity-0'
				style={{
					background:
						'linear-gradient(90deg, rgba(34,211,238,0) 0%, rgba(167,139,250,0.45) 45%, rgba(34,211,238,0) 100%)',
				}}
			/>
			<div className='relative z-10'>{children}</div>
		</div>
	)
}

