import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import SubHeading from './SubHeading'
import PixelCard from './reactBits/components/PixelCard/PixelCard'
import Link from 'next/link'
import { projects, ProjectType } from '@/projects-data'

function ProjectsSection() {
	return (
		<div className='flex flex-col gap-2 md:gap-4'>
			<SubHeading text='Projects' />
			<div className='flex flex-wrap gap-4 justify-center'>
				{projects.map((project: ProjectType) => (
					<div
						className='space-y-2 flex flex-col items-center  gap-4 bg-white/10 backdrop-blur-lg rounded-lg w-full md:w-1/3 cursor-pointer min-h-[6rem] md:h-[35rem] '
						key={project.slug}
					>
						<Link
							className='w-full'
							href={{ pathname: `/projects`, query: { slug: project.slug } }}
						>
							<img
								className='w-full h-[300px] object-cover rounded-lg'
								src={project.headerImage}
								alt={project.title}
								width={300}
								height={300}
							/>
						</Link>
						<div className='p-2 md:p-4 flex flex-col gap-2 w-full'>
							<Link
								href={{ pathname: `/projects`, query: { slug: project.slug } }}
							>
								<p className='text-lg text-start w-full line-clamp-1 font-bold'>
									{project.title}
								</p>
							</Link>
							<hr className='border-gray-200 w-full' />
							<p className='text-sm text-start w-full line-clamp-6 min-h-[7rem]'>
								{project.headerDescription}
							</p>
							<Link
								href={{ pathname: `/projects`, query: { slug: project.slug } }}
							>
								<PixelCard className='max-h-10 max-w-10 rounded-full'>
									<FaArrowUpRightFromSquare className='absolute' />
								</PixelCard>
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default ProjectsSection
