'use client'

import siteSettings from '@/site-setting'
import ContactBlocks from './ContactBlocks'
import Heading from './Heading'
import SubHeading from './SubHeading'

function HeroSection() {
	return (
		<div className='flex flex-col items-center justify-start md:justify-center space-y-6 h-screen relative '>
			<div className='flex flex-col items-center justify-center space-y-2'>
				<Heading
					text={siteSettings.mainTitle}
					className='!my-2 !mt-10 md:!mt-0'
				/>
				<SubHeading text={`( ${siteSettings.position} )`} />
			</div>
			<p className='text-white text-center md:text-start md:text-lg max-w-2xl'>
				{siteSettings.coverDescription}
			</p>
			<ContactBlocks />
		</div>
	)
}

export default HeroSection
