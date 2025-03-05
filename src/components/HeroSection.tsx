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
			<img
				src='https://media.licdn.com/dms/image/v2/C5603AQFDI8TlRQF2mA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1659496917185?e=1746662400&v=beta&t=acw4Q6cplbF8ZouU3BKngxLyj92XRrxaH26k3IbIpFE'
				alt=''
				className='w-[200px] h-[200px] object-cover rounded-full shadow-lg  border-2 border-white/10'
			/>
		</div>
	)
}

export default HeroSection
