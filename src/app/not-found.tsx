'use client'

import FuzzyText from '@/components/reactBits/TextAnimations/FuzzyText/FuzzyText'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-screen space-y-4">
			<FuzzyText
				baseIntensity={0.2}
				hoverIntensity={0.2}
				enableHover={true}
			>
				404
			</FuzzyText>
			<Link href="/" className="text-2xl text-white font-bold hover:text-gray-300 hover:underline hover:underline-offset-4 hover:decoration-gray-300">Go to home</Link>
		</div>
	)
}