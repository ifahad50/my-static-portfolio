'use client'

import siteSettings from '@/site-setting'
import ContactBlocks from './ContactBlocks'
import Heading from './Heading'
import SubHeading from './SubHeading'
import MoonBreakCompile from './MoonBreakCompile'
import { useRef } from 'react'

function HeroSection() {
	const heroRef = useRef<HTMLDivElement | null>(null)

	return (
		<div
			ref={heroRef}
			className='flex flex-col items-center justify-start md:justify-center space-y-6 h-screen relative overflow-hidden'
		>
			{/* Scroll-driven "moon breaks -> compiles" effect (non-interactive). */}
			<div className='absolute inset-0 pointer-events-none z-0'>
				<MoonBreakCompile heroRef={heroRef} />
			</div>

			<div className='relative z-10 flex flex-col items-center justify-center space-y-2'>
				<div className='flex flex-col items-center justify-center space-y-2 mt-10 mb-4'>
					<img
						src='/header_image.jpeg'
						alt='Fahad Iqbal'
						className='w-[100px] h-[100px] object-cover rounded-lg shadow-2xl'
					/>
				</div>
				<Heading text={siteSettings.mainTitle} />
				<SubHeading text={`( ${siteSettings.position} )`} />
			</div>
			<p className='relative z-10 text-white text-center md:text-start md:text-lg max-w-2xl'>
				{siteSettings.coverDescription}
			</p>
			<div className='relative z-10'>
				<ContactBlocks />
			</div>
		</div>
	)
}

export default HeroSection
