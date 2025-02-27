'use client'

import siteSettings from '@/site-setting'
import SubHeading from './SubHeading'

function WorkExperienceSection() {
	const isBrowser = typeof window !== 'undefined'
	return (
		<div className='w-full'>
			<SubHeading text='Work Experience' />

			<div className='max-w-4xl mx-auto relative'>
				{/* Timeline line */}
				<div className='absolute left-2 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200'></div>

				{/* Experience Items */}
				<div className='space-y-12'>
					{siteSettings.workExperiences.map((experience, index) => (
						<div
							key={`work-experience-${index}`}
							className='flex md:justify-center items-center'
						>
							<div
								className={`hidden space-y-2 md:block w-1/2 ${
									index % 2 === 0 ? 'pr-8 text-right' : 'pr-8 opacity-0'
								}`}
							>
								{index % 2 === 0 && (
									<>
										<h3 className='font-bold text-xl text-start underline underline-offset-4'>
											{experience.title}
										</h3>
										<p className='text-foreground text-start'>
											{experience.company}
										</p>
										<p className='text-sm text-foreground text-start'>
											{experience.period}
										</p>
										<p className='mt-2 text-start'>{experience.description}</p>
										<hr className='my-2 border-gray-200' />
										<p className='mt-1 text-start'>
											{experience.techStack.join(' | ')}
										</p>
									</>
								)}
							</div>
							<div className='absolute left-0 md:relative md:left-auto flex items-center justify-center'>
								<div className='w-4 h-4 rounded-full bg-primary border-4 border-white'></div>
							</div>
							<div
								className={`pl-8 md:w-1/2 space-y-2 ${
									index % 2 === 1 ? 'md:pl-8' : 'md:pl-8 md:opacity-0'
								}`}
							>
								{/* Show all items on mobile, but maintain desktop layout */}
								{((isBrowser && window.innerWidth < 768) ||
									index % 2 === 1) && (
									<>
										<h3 className='font-bold text-xl underline underline-offset-4'>
											{experience.title}
										</h3>
										<p className='text-foreground'>{experience.company}</p>
										<p className='text-sm text-foreground'>
											{experience.period}
										</p>
										<p className='mt-2'>{experience.description}</p>
										<hr className='my-2 border-gray-200' />
										<p className='mt-1'>{experience.techStack.join(' | ')}</p>
									</>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default WorkExperienceSection
