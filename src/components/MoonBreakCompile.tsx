'use client'

import {
	animate,
	createTimeline,
	remove as animeRemove,
	set as animeSet,
	stagger as animeStagger,
} from 'animejs'
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'

type Shard = {
	id: string
	baseX: number
	baseY: number
	baseRot: number
	breakX: number
	breakY: number
	breakRot: number
	breakOpacity: number
}

type CodeLine = {
	id: string
	text: string
	centerX: number
	centerY: number
	scatterX: number
	scatterY: number
	compileX: number
	compileY: number
}

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

export default function MoonBreakCompile({
	heroRef,
}: {
	heroRef: RefObject<HTMLElement | null>
}) {
	const reducedMotion = usePrefersReducedMotion()
	const moonRef = useRef<HTMLDivElement | null>(null)

	const shardElsRef = useRef<(HTMLDivElement | null)[]>([])
	const lineElsRef = useRef<(HTMLDivElement | null)[]>([])

	const timelineRef = useRef<any>(null)
	const rafSeekRef = useRef<number | null>(null)

	const [shards, setShards] = useState<Shard[]>([])
	const [codeLines, setCodeLines] = useState<CodeLine[]>([])
	const [pieceSize, setPieceSize] = useState(24)

	const lineTexts = useMemo(
		() => [
			'const moon = new Galaxy();',
			'break(moon, { glitch: true });',
			'compile(moon);',
			'emit(stars, moon.constellation);',
			'// ship it to orbit',
			'ready(mind, code, cosmos);',
		],
		[]
	)

	useEffect(() => {
		if (typeof window === 'undefined') return
		if (!moonRef.current) return

		const build = () => {
			const moonEl = moonRef.current
			if (!moonEl) return

			const size = moonEl.getBoundingClientRect().width
			const radius = size / 2
			const pieceSize = Math.max(16, Math.floor(size / 8))
			setPieceSize(pieceSize)
			const cell = pieceSize

			const nextShards: Shard[] = []

			let shardIndex = 0
			for (let y = -radius + cell / 2; y <= radius - cell / 2; y += cell) {
				for (let x = -radius + cell / 2; x <= radius - cell / 2; x += cell) {
					const d = Math.sqrt(x * x + y * y)
					if (d > radius * 0.82) continue

					// Make a little “chunk” feel by adding a subtle hole near the edge.
					if (d > radius * 0.74 && (shardIndex % 3 !== 0)) {
						shardIndex++
						continue
					}

					const nx = d === 0 ? 0 : x / d
					const ny = d === 0 ? 0 : y / d

					const breakDistance = radius * (0.55 + (shardIndex % 7) * 0.03)
					const baseRot = ((shardIndex * 57) % 360) - 180

					const baseX = x - cell / 2
					const baseY = y - cell / 2
					const breakX = baseX + nx * breakDistance
					const breakY = baseY + ny * breakDistance

					const breakRot = baseRot + (nx * 120 + ny * -90)
					const breakOpacity = 0.22 + ((shardIndex % 5) / 5) * 0.55

					nextShards.push({
						id: `shard-${shardIndex}`,
						baseX,
						baseY,
						baseRot,
						breakX,
						breakY,
						breakRot,
						breakOpacity,
					})

					shardIndex++
				}
			}

			// Cap shards for performance.
			const capped = nextShards.slice(0, 64)
			setShards(capped)

			// Lines are positioned after measuring their widths/heights (below).
			// We'll create placeholders now so React renders the nodes.
			const placeholderLines: CodeLine[] = lineTexts.map((text, i) => ({
				id: `line-${i}`,
				text,
				centerX: 0,
				centerY: 0,
				scatterX: 0,
				scatterY: 0,
				compileX: 0,
				compileY: 0,
			}))
			setCodeLines(placeholderLines)
		}

		build()
		const ro = new ResizeObserver(() => build())
		if (moonRef.current) ro.observe(moonRef.current)

		return () => ro.disconnect()
	}, [lineTexts])

	useEffect(() => {
		if (typeof window === 'undefined') return
		if (!shards.length || !codeLines.length) return
		if (!moonRef.current) return

		let mounted = true

		const init = () => {
			if (!mounted) return

			const moonEl = moonRef.current
			if (!moonEl) return
			const size = moonEl.getBoundingClientRect().width
			const radius = size / 2

			// Measure line nodes so we can center them properly with translateX/Y.
			const measuredLines: CodeLine[] = codeLines.map((l, i) => {
				const el = lineElsRef.current[i]
				const w = el?.getBoundingClientRect().width ?? 120
				const h = el?.getBoundingClientRect().height ?? 18

				const angle = (i / Math.max(1, codeLines.length)) * Math.PI * 2 - Math.PI / 2
				const ringRadius = radius * 1.18
				const scatterRadius = radius * 0.62
				const jitter = (i % 3) * 0.12

				const centerX = -w / 2
				const centerY = -h / 2

				const scatterX = centerX + Math.cos(angle + 0.9) * scatterRadius
				const scatterY = centerY + Math.sin(angle + 0.9) * scatterRadius * (0.85 + jitter)

				const compileX = centerX + Math.cos(angle) * ringRadius
				const compileY = centerY + Math.sin(angle) * ringRadius * (0.85 + jitter)

				return {
					...l,
					centerX,
					centerY,
					scatterX,
					scatterY,
					compileX,
					compileY,
				}
			})

			// If reduced motion is enabled, just render the “compiled” state.
			const shardTargets = shardElsRef.current.filter(Boolean) as HTMLDivElement[]
			const lineTargets = lineElsRef.current.filter(Boolean) as HTMLDivElement[]

			if (!shardTargets.length || !lineTargets.length) return

			if (reducedMotion) {
				const shardCount = Math.min(shardTargets.length, shards.length)
				for (let i = 0; i < shardCount; i++) {
					const s = shards[i]
					anime.set(shardTargets[i], {
						translateX: s?.baseX ?? 0,
						translateY: s?.baseY ?? 0,
						rotate: s?.baseRot ?? 0,
						opacity: 1,
					})
				}

				const lineCount = Math.min(lineTargets.length, measuredLines.length)
				for (let i = 0; i < lineCount; i++) {
					const l = measuredLines[i]
					anime.set(lineTargets[i], {
						translateX: l?.compileX ?? 0,
						translateY: l?.compileY ?? 0,
						opacity: 1,
						filter: 'blur(0px)',
					})
				}
				return
			}

			const DURATION = 2500
			anime.remove(shardTargets)
			anime.remove(lineTargets)

			// Ensure a clean starting point.
			const shardCount = Math.min(shardTargets.length, shards.length)
			for (let i = 0; i < shardCount; i++) {
				const s = shards[i]
				anime.set(shardTargets[i], {
					translateX: s?.baseX ?? 0,
					translateY: s?.baseY ?? 0,
					rotate: s?.baseRot ?? 0,
					opacity: 1,
				})
			}

			const lineCount = Math.min(lineTargets.length, measuredLines.length)
			for (let i = 0; i < lineCount; i++) {
				const l = measuredLines[i]
				anime.set(lineTargets[i], {
					translateX: l?.centerX ?? 0,
					translateY: l?.centerY ?? 0,
					opacity: 0,
					filter: 'blur(3px)',
				})
			}

			const timeline = anime.timeline({
				autoplay: false,
				duration: DURATION,
				easing: 'linear',
			})

			// Break phase
			for (let i = 0; i < shardCount; i++) {
				const s = shards[i]
				timeline.add(
					{
						targets: shardTargets[i],
						translateX: s?.breakX ?? 0,
						translateY: s?.breakY ?? 0,
						rotate: s?.breakRot ?? 0,
						opacity: s?.breakOpacity ?? 0.5,
						duration: 950,
						easing: 'easeOutCubic',
					},
					0
				)
			}

			for (let i = 0; i < lineCount; i++) {
				const l = measuredLines[i]
				timeline.add(
					{
						targets: lineTargets[i],
						translateX: l?.scatterX ?? 0,
						translateY: l?.scatterY ?? 0,
						opacity: [0, 1],
						filter: ['blur(3px)', 'blur(0px)'],
						duration: 900,
						easing: 'easeOutCubic',
					},
					0
				)
			}

			// Compile phase
			for (let i = 0; i < shardCount; i++) {
				const s = shards[i]
				timeline.add(
					{
						targets: shardTargets[i],
						translateX: s?.baseX ?? 0,
						translateY: s?.baseY ?? 0,
						rotate: s?.baseRot ?? 0,
						opacity: 1,
						duration: 1200,
						easing: 'easeInOutCubic',
					},
					900
				)
			}

			for (let i = 0; i < lineCount; i++) {
				const l = measuredLines[i]
				timeline.add(
					{
						targets: lineTargets[i],
						translateX: l?.compileX ?? 0,
						translateY: l?.compileY ?? 0,
						opacity: [0.2, 1],
						filter: ['blur(0px)', 'blur(0px)'],
						duration: 1400,
						easing: 'easeInOutCubic',
					},
					1000
				)
			}

			timeline.seek(0)
			timelineRef.current = timeline

			const updateProgress = () => {
				const heroEl = heroRef.current
				if (!heroEl || !timelineRef.current) return

				const rect = heroEl.getBoundingClientRect()
				const start = window.innerHeight
				const end = -heroEl.offsetHeight
				const denom = start - end
				if (denom <= 0) return

				// 0 at (top just enters from bottom), 1 when it leaves at the top.
				const t = (start - rect.top) / denom
				const p = Math.max(0, Math.min(1, t))
				timelineRef.current.seek(p * DURATION)
			}

			// Run once to avoid flash.
			updateProgress()

			const onScroll = () => {
				if (rafSeekRef.current) return
				rafSeekRef.current = window.requestAnimationFrame(() => {
					rafSeekRef.current = null
					updateProgress()
				})
			}

			window.addEventListener('scroll', onScroll, { passive: true })
			window.addEventListener('resize', updateProgress)

			return () => {
				window.removeEventListener('scroll', onScroll)
				window.removeEventListener('resize', updateProgress)
				timeline.pause()
				anime.remove(shardTargets)
				anime.remove(lineTargets)
			}
		}

		const cleanupInit = init()
		return () => {
			mounted = false
			if (cleanupInit && typeof cleanupInit === 'function') cleanupInit()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [heroRef, reducedMotion, shards, codeLines.length])

	return (
		<div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
			<div
				ref={moonRef}
				className='relative w-[70vw] max-w-[420px] aspect-square'
				aria-hidden='true'
			>
				{/* Glow base */}
				<div
					className='absolute inset-0 rounded-full'
					style={{
						background:
							'radial-gradient(circle at 30% 30%, rgba(167,139,250,0.35) 0%, rgba(34,211,238,0.12) 40%, rgba(0,0,0,0) 70%)',
						boxShadow: '0 0 90px rgba(167,139,250,0.18)',
					}}
				/>

				{/* Compiled moon core */}
				<div
					className='absolute inset-0 rounded-full'
					style={{
						background:
							'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.12) 0%, rgba(167,139,250,0.22) 35%, rgba(34,211,238,0.08) 60%, rgba(0,0,0,0) 75%)',
					}}
				/>

				{shards.map((s, i) => (
					<div
						key={s.id}
						ref={(el) => {
							shardElsRef.current[i] = el
						}}
						className='absolute rounded-md'
						style={{
							left: '50%',
							top: '50%',
							width: pieceSize,
							height: pieceSize,
							background:
								'linear-gradient(135deg, rgba(167,139,250,0.55) 0%, rgba(34,211,238,0.25) 55%, rgba(255,255,255,0.08) 100%)',
							boxShadow: 'inset 0 0 12px rgba(255,255,255,0.10)',
						}}
					/>
				))}

				{/* Coding/terminal lines */}
				{codeLines.map((l, i) => (
					<div
						key={l.id}
						ref={(el) => {
							lineElsRef.current[i] = el
						}}
						className='absolute font-mono text-xs sm:text-sm text-white/85 tracking-wide select-none whitespace-nowrap'
						style={{
							left: '50%',
							top: '50%',
							opacity: reducedMotion ? 1 : 0,
							textShadow: '0 0 18px rgba(34,211,238,0.18)',
						}}
					>
						{l.text}
					</div>
				))}
			</div>
		</div>
	)
}

