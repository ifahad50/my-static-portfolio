'use client'

import React, { useEffect, useState } from 'react'
import {
	motion,
	useMotionValue,
	useAnimation,
	useTransform,
	PanInfo,
} from 'framer-motion'
import { RecommendationCard } from '@/components/RecommendationsSection'
import { RecommendationType } from '@/recommendation-data'

interface RollingGalleryProps {
	autoplay?: boolean
	pauseOnHover?: boolean
	images?: string[]
	recommendations: RecommendationType[]
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
	autoplay = false,
	pauseOnHover = false,
	images = [],
	recommendations,
}) => {
	const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(false)
	const [mounted, setMounted] = useState<boolean>(false)

	useEffect(() => {
		setIsScreenSizeSm(window.innerWidth <= 640)
		setMounted(true)

		const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	// Don't calculate measurements until component is mounted
	const cardWidth = mounted ? (isScreenSizeSm ? 300 : 400) : 300
	const cardGap = mounted ? (isScreenSizeSm ? 8 : 8) : 8 // Unified gap size
	const singleSetWidth = (cardWidth + cardGap) * recommendations.length
	const totalWidth = singleSetWidth

	// Adjust drag sensitivity
	const dragFactor: number = 1

	// Framer Motion values and controls
	const rotation = useMotionValue(0)
	const controls = useAnimation()

	// Create a 3D transform based on the rotation motion value
	const transform = useTransform(
		rotation,
		(val: number) => `rotate3d(0,1,0,${val}deg)`
	)

	const startInfiniteSpin = (startPosition: number) => {
		controls.start({
			x: [startPosition, startPosition - singleSetWidth],
			transition: {
				duration: 80,
				ease: 'linear',
				repeat: Infinity,
				repeatType: 'loop',
				repeatDelay: 0,
				onRepeat: () => {
					rotation.set(startPosition)
				},
			},
		})
	}

	useEffect(() => {
		if (autoplay) {
			startInfiniteSpin(0)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [autoplay, recommendations.length])

	const handleUpdate = (latest: any) => {
		if (typeof latest.x === 'number') {
			rotation.set(latest.x)
		}
	}

	const handleDrag = (_: any, info: PanInfo): void => {
		controls.stop()
		const newPosition = rotation.get() + info.delta.x

		if (newPosition > 0) {
			rotation.set(newPosition - singleSetWidth)
		} else if (newPosition < -singleSetWidth) {
			rotation.set(newPosition + singleSetWidth)
		} else {
			rotation.set(newPosition)
		}
	}

	const handleDragEnd = (_: any, info: PanInfo): void => {
		const velocity = info.velocity.x * 0.2
		const newPosition = rotation.get() + velocity

		if (autoplay) {
			startInfiniteSpin(newPosition)
		}
	}

	const handleMouseEnter = (): void => {
		if (autoplay && pauseOnHover) {
			controls.stop()
			const currentPosition = rotation.get()
			rotation.set(currentPosition)
		}
	}

	const handleMouseLeave = (): void => {
		if (autoplay && pauseOnHover) {
			const currentPosition = rotation.get()
			startInfiniteSpin(currentPosition)
		}
	}

	if (!mounted) {
		return null // or a loading placeholder
	}

	return (
		<div
			className='relative h-fit w-full overflow-hidden'
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div
				className='absolute top-0 left-0 h-full w-[48px] z-10'
				style={{
					background:
						'linear-gradient(to left, rgba(0,0,0,0) 0%, #171717 100%)',
				}}
			/>
			<div
				className='absolute top-0 right-0 h-full w-[48px] z-10'
				style={{
					background:
						'linear-gradient(to right, rgba(0,0,0,0) 0%, #171717 100%)',
				}}
			/>
			<div className='flex h-full items-center justify-center'>
				<motion.div
					drag='x'
					dragElastic={0.2}
					dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
					onDrag={handleDrag}
					onDragEnd={handleDragEnd}
					animate={controls}
					onUpdate={handleUpdate}
					style={{
						x: rotation,
						display: 'flex',
						gap: `${cardGap}px`,
						paddingLeft: '24px',
						paddingRight: '24px',
					}}
					className='cursor-grab active:cursor-grabbing'
				>
					{[...recommendations, ...recommendations].map((recommendation, i) => (
						<motion.div
							key={i}
							style={{
								width: cardWidth,
								flex: `0 0 ${cardWidth}px`,
							}}
							whileTap={{ cursor: 'grabbing' }}
						>
							<RecommendationCard recommendation={recommendation} />
						</motion.div>
					))}
				</motion.div>
			</div>
		</div>
	)
}

export default RollingGallery
