'use client'

import { useEffect, useRef } from 'react'
import { animate, remove as animeRemove } from 'animejs'

let _counter = 0

function SubHeading({ text, className }: { text: string; className?: string }) {
	const wrapRef = useRef<HTMLDivElement | null>(null)
	const indexRef = useRef(++_counter)
	const observedRef = useRef(false)

	useEffect(() => {
		const el = wrapRef.current
		if (!el) return

		el.style.opacity = '0'
		el.style.transform = 'translateY(20px)'

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0]
				if (entry?.isIntersecting && !observedRef.current) {
					observedRef.current = true
					animate(el, {
						opacity: [0, 1],
						translateY: [20, 0],
						duration: 700,
						easing: 'easeOutCubic',
					})
					observer.disconnect()
				}
			},
			{ threshold: 0.2 }
		)

		observer.observe(el)
		return () => {
			observer.disconnect()
			animeRemove(el)
		}
	}, [])

	const num = String(indexRef.current).padStart(2, '0')

	return (
		<div ref={wrapRef} className={`my-10 md:my-14 ${className ?? ''}`}>
			<div className='flex items-center gap-3 md:gap-4'>
				<span className='font-mono text-xs text-white/30 select-none shrink-0'>
					{`// ${num}`}
				</span>
				<h3 className='text-xl md:text-2xl font-bold text-white tracking-tight'>
					<span className='text-white/30 mr-1 font-mono font-normal text-lg'>{'<'}</span>
					{text}
					<span className='text-white/30 ml-1 font-mono font-normal text-lg'>{'/>'}</span>
				</h3>
				<div className='flex-1 h-px bg-gradient-to-r from-white/20 via-white/8 to-transparent min-w-[40px]' />
			</div>
		</div>
	)
}

export default SubHeading
