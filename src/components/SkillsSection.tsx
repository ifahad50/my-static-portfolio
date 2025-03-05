'use client'

import {
	SiCloudflareworkers,
	SiElasticsearch,
	SiJfrogpipelines,
	SiNestjs,
	SiNextdotjs,
	SiOracle,
	SiRabbitmq,
	SiTypescript,
} from 'react-icons/si'
import SubHeading from './SubHeading'
import { Fragment } from 'react'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip'
import { TbBrandCSharp, TbSql } from 'react-icons/tb'
import {
	FaAws,
	FaCheck,
	FaCloudflare,
	FaCss3,
	FaDatabase,
	FaDigitalOcean,
	FaDocker,
	FaFileExcel,
	FaGithub,
	FaNode,
	FaPhp,
	FaPython,
	FaReact,
	FaWordpress,
} from 'react-icons/fa6'
import { BiLogoPostgresql } from 'react-icons/bi'
import { GrMysql } from 'react-icons/gr'
import { RiSpeakAiFill, RiTailwindCssFill } from 'react-icons/ri'
import { SiMongodb } from 'react-icons/si'
import { DiRedis } from 'react-icons/di'
import { IoLogoHtml5, IoLogoJavascript } from 'react-icons/io'
import { LuBlocks } from 'react-icons/lu'
import { GiBullseye, GiGrowth } from 'react-icons/gi'

interface skillProp {
	icon: React.ReactNode
	name: string
}
interface skillBlockProp {
	heading: string
	items: skillProp[]
}
function SkillsSection() {
	const skills: skillBlockProp[] = [
		{
			heading: 'Technologies I Have Mastered',
			items: [
				{
					icon: <SiNextdotjs className='text-3xl' />,
					name: 'Next.js',
				},
				{
					icon: <FaReact className='text-3xl' />,
					name: 'React',
				},
				{
					icon: <FaNode className='text-3xl' />,
					name: 'Node.js',
				},
				{
					icon: <RiTailwindCssFill className='text-3xl' />,
					name: 'Tailwind',
				},

				{
					icon: <SiNestjs className='text-3xl' />,
					name: 'Nest.js',
				},
				{
					icon: <FaWordpress className='text-3xl' />,
					name: 'Wordpress',
				},

				{
					icon: <SiRabbitmq className='text-3xl' />,
					name: 'RabbitMQ',
				},
				{
					icon: <SiOracle className='text-3xl' />,
					name: 'Oracle Fusion',
				},
				{
					icon: <SiOracle className='text-3xl' />,
					name: 'Oracle Visual Builder',
				},
				{
					icon: <SiOracle className='text-3xl' />,
					name: 'Oracle APEX',
				},
				{
					icon: <SiOracle className='text-3xl' />,
					name: 'Integration Cloud',
				},
				{
					icon: <SiOracle className='text-3xl' />,
					name: 'Oracle OTBI',
				},
			],
		},
		{
			heading: 'Cloud Platforms & Deployment Strategies',
			items: [
				{
					icon: <FaAws className='text-3xl' />,
					name: 'AWS',
				},
				{
					icon: <FaDigitalOcean className='text-3xl' />,
					name: 'Digital Ocean',
				},
				{
					icon: <FaCloudflare className='text-3xl' />,
					name: 'Cloudflare',
				},
				{
					icon: <SiCloudflareworkers className='text-3xl' />,
					name: 'Cloudflare Workers',
				},
				{
					icon: <FaDocker className='text-3xl' />,
					name: 'Docker',
				},
				{
					icon: <FaGithub className='text-3xl' />,
					name: 'Git',
				},
				{
					icon: <SiJfrogpipelines className='text-3xl' />,
					name: 'CI/CD',
				},
			],
		},
		{
			heading: 'Database',
			items: [
				{
					icon: <BiLogoPostgresql className='text-3xl' />,
					name: 'PostgreSQL',
				},

				{
					icon: <GrMysql className='text-3xl' />,
					name: 'MySQL',
				},
				{
					icon: <SiMongodb className='text-3xl' />,
					name: 'MongoDB',
				},
				{
					icon: <DiRedis className='text-3xl' />,
					name: 'Redis',
				},
				{
					icon: <SiElasticsearch className='text-3xl' />,
					name: 'Elasticsearch',
				},
				{
					icon: <FaDatabase className='text-3xl' />,
					name: 'Oracle Database',
				},
			],
		},
		{
			heading: 'Languages',
			items: [
				{
					icon: <IoLogoJavascript className='text-3xl' />,
					name: 'Javascript',
				},
				{
					icon: <SiTypescript className='text-3xl' />,
					name: 'Typescript',
				},
				{
					icon: <IoLogoHtml5 className='text-3xl' />,
					name: 'HTML',
				},
				{
					icon: <FaCss3 className='text-3xl' />,
					name: 'CSS',
				},
				{
					icon: <FaPython className='text-3xl' />,
					name: 'Python',
				},
				{
					icon: <TbBrandCSharp className='text-3xl' />,
					name: 'C#',
				},
				{
					icon: <FaPhp className='text-3xl' />,
					name: 'PHP',
				},
				{
					icon: <FaFileExcel className='text-3xl' />,
					name: 'VBA',
				},
				{
					icon: <TbSql className='text-3xl' />,
					name: 'SQL',
				},
			],
		},
		{
			heading: 'Soft Skills',
			items: [
				{
					icon: <FaCheck className='text-3xl' />,
					name: 'Problem Solving',
				},
				{
					icon: <RiSpeakAiFill className='text-3xl' />,
					name: 'Effective Communication',
				},
				{
					icon: <LuBlocks className='text-3xl' />,
					name: 'Effective Teamwork',
				},
				{
					icon: <GiBullseye className='text-3xl' />,
					name: 'Attention to Detail',
				},
				{
					icon: <GiGrowth className='text-3xl' />,
					name: 'Self-Motivation',
				},
			],
		},
	]

	return (
		<div className='w-full flex flex-col justify-center items-center '>
			{skills.map((skillBlock: skillBlockProp) => (
				<Fragment key={`${skillBlock.heading}-skills`}>
					<SubHeading text={skillBlock.heading} />
					<div className='flex flex-wrap w-full gap-2 md:max-w-4xl md:gap-4 items-center justify-center'>
						{skillBlock.items.map((skill: skillProp, idx: number) => (
							<TooltipProvider key={`${idx}-skill-${skill.name}`}>
								<Tooltip>
									<TooltipTrigger asChild>
										<div className='flex flex-col items-center justify-center gap-4 bg-white/10 backdrop-blur-lg rounded-lg w-24 md:w-36 p-2 md:p-4 cursor-pointer min-h-[6rem] md:min-h-[8rem]'>
											{skill.icon}
											<p className='text-wrap line-clamp-2 text-center text-xs md:text-sm '>
												{skill.name}
											</p>
										</div>
									</TooltipTrigger>
									<TooltipContent>
										<p>{skill.name}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						))}
					</div>
				</Fragment>
			))}
		</div>
	)
}

export default SkillsSection
