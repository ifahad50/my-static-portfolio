'use client'

import siteSettings from '@/site-setting'
import ContactBlocks from './ContactBlocks'
import Heading from './Heading'
import SubHeading from './SubHeading'

function HeroSection() {
	return (
		<div className='flex flex-col items-center justify-start md:justify-center space-y-6 h-screen relative '>
			<div className='flex flex-col items-center justify-center space-y-2'>
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
			<p className='text-white text-center md:text-start md:text-lg max-w-2xl'>
				{siteSettings.coverDescription}
			</p>
			<ContactBlocks />
		</div>
	)
}

export default HeroSection
