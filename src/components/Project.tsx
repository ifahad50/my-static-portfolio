import { FC } from 'react'
import { projects, ProjectType } from '@/projects-data'
import NotFound from '@/app/not-found'
import Heading from './Heading'
import SubHeading from './SubHeading'
import Link from 'next/link'
import PixelCard from './reactBits/components/PixelCard/PixelCard'
import { FaArrowLeft } from 'react-icons/fa6'

interface ProjectProps {
    slug: string
}

const Project: FC<ProjectProps> = ({ slug }) => {
    const project: ProjectType | undefined = projects.find((project: any) => project.slug === slug)

    if (!project) {
        return <NotFound />
    }

    return (
        <div className="flex flex-col items-start justify-center space-y-4 max-w-screen-xl mx-auto">
            <Heading text={project.title} className='w-full !mb-2' />
            <img src={project.headerImage} alt={project.title} width={100} height={100} className='w-full mx-auto h-auto max-h-[600px] rounded-lg object-cover' />
            <SubHeading text='Tech Stack' />
            <div className='flex flex-col items-start justify-center '>
                <div className='w-full flex flex-wrap items-center justify-start gap-2'>
                    {project.technologiesUsed.map((technology: string, index: number) => (
                        <div key={`${index}-${technology}`} className=' bg-white/10 backdrop-blur-lg rounded-lg p-2 md:p-4'>
                            <span className='text-xs md:text-sm text-primary'>{technology}</span>
                        </div>
                    ))}
                </div>
            </div>
            <SubHeading text='Overview' />
            <div className='w-full bg-white/10 backdrop-blur-lg rounded-lg p-2 md:p-4'>
                <p className='text-sm md:text-lg'>{project.headerDescription}</p>
            </div>
            <SubHeading text='Details' />
            <div className='w-full bg-white/10 backdrop-blur-lg rounded-lg p-2 md:p-4'>
                <div className='prose prose-invert text-sm md:text-lg' dangerouslySetInnerHTML={{ __html: project.content }} />
            </div>
            <BackToProjects />
        </div>
    )
}

function BackToProjects() {
    return <Link href={{ pathname: `/projects` }} className='flex flex-row items-center justify-center gap-2'>
        <PixelCard className='max-h-10 max-w-10 rounded-full'>
            <FaArrowLeft className='absolute' />
        </PixelCard>
        <span className='text-sm text-primary'>Back to Projects</span>
    </Link>
}

export default Project
