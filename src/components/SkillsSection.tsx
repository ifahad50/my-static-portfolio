'use client'

import {
	SiCloudflareworkers, SiElasticsearch, SiJfrogpipelines, SiNestjs,
	SiNextdotjs, SiOracle, SiRabbitmq, SiTypescript,
} from 'react-icons/si'
import SubHeading from './SubHeading'
import { Fragment, useEffect, useRef } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { TbBrandCSharp, TbSql } from 'react-icons/tb'
import {
	FaAws, FaCheck, FaCloudflare, FaCss3, FaDatabase, FaDigitalOcean,
	FaDocker, FaFileExcel, FaGithub, FaNode, FaPhp, FaPython, FaReact, FaWordpress,
} from 'react-icons/fa6'
import { BiLogoPostgresql } from 'react-icons/bi'
import { GrMysql } from 'react-icons/gr'
import { RiSpeakAiFill, RiTailwindCssFill } from 'react-icons/ri'
import { SiMongodb } from 'react-icons/si'
import { DiRedis } from 'react-icons/di'
import { IoLogoHtml5, IoLogoJavascript } from 'react-icons/io'
import { LuBlocks } from 'react-icons/lu'
import { GiBullseye, GiGrowth } from 'react-icons/gi'
import { animate, stagger, remove as animeRemove } from 'animejs'

interface SkillProp { icon: React.ReactNode; name: string }
interface SkillBlockProp { heading: string; items: SkillProp[] }

function SkillGroup({ block, groupIndex }: { block: SkillBlockProp; groupIndex: number }) {
	const gridRef = useRef<HTMLDivElement | null>(null)
	const observed = useRef(false)

	useEffect(() => {
		const el = gridRef.current
		if (!el) return
		const children = Array.from(el.children) as HTMLElement[]
		children.forEach(c => { c.style.opacity = '0'; c.style.transform = 'scale(0.85) translateY(12px)' })

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting && !observed.current) {
					observed.current = true
					animate(children, {
						opacity: [0, 1],
						scale: [0.85, 1],
						translateY: [12, 0],
						duration: 500,
						delay: stagger(40),
						easing: 'easeOutBack',
					})
					observer.disconnect()
				}
			},
			{ threshold: 0.1 }
		)
		observer.observe(el)
		return () => { observer.disconnect(); animeRemove(children) }
	}, [])

	return (
		<Fragment key={`${block.heading}-${groupIndex}`}>
			<div className='w-full max-w-4xl flex items-center gap-3 mb-4'>
				<span className='font-mono text-xs text-white/30 shrink-0'>$ ls {block.heading.toLowerCase().replace(/\s+/g, '-')}</span>
				<div className='flex-1 h-px bg-white/[0.06]' />
			</div>
			<div ref={gridRef} className='flex flex-wrap w-full gap-2 md:max-w-4xl md:gap-3 items-center justify-center mb-8'>
				{block.items.map((skill, idx) => (
					<TooltipProvider key={`${idx}-${skill.name}`}>
						<Tooltip>
							<TooltipTrigger asChild>
								<div>
									<SkillChip skill={skill} />
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p className='font-mono text-xs'>{skill.name}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				))}
			</div>
		</Fragment>
	)
}

function SkillChip({ skill }: { skill: SkillProp }) {
	const chipRef = useRef<HTMLDivElement | null>(null)

	const handleEnter = () => {
		if (!chipRef.current) return
		animate(chipRef.current, {
			scale: [1, 1.08],
			duration: 200,
			easing: 'easeOutQuad',
		})
	}
	const handleLeave = () => {
		if (!chipRef.current) return
		animate(chipRef.current, {
			scale: [1.08, 1],
			duration: 200,
			easing: 'easeOutQuad',
		})
	}

	return (
		<div
			ref={chipRef}
			onMouseEnter={handleEnter}
			onMouseLeave={handleLeave}
			className='flex flex-col items-center justify-center gap-2 w-20 md:w-28 p-2 md:p-3 min-h-[5.5rem] md:min-h-[7rem] rounded-xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl cursor-pointer hover:border-white/20 hover:bg-white/[0.07] transition-colors duration-200'
		>
			<div className='text-2xl md:text-3xl text-white/70'>{skill.icon}</div>
			<p className='text-wrap text-center text-[10px] md:text-xs text-white/60 leading-tight line-clamp-2'>{skill.name}</p>
		</div>
	)
}

function SkillsSection() {
	const skills: SkillBlockProp[] = [
		{
			heading: 'Technologies I Have Mastered',
			items: [
				{ icon: <SiNextdotjs />, name: 'Next.js' },
				{ icon: <FaReact />, name: 'React' },
				{ icon: <FaNode />, name: 'Node.js' },
				{ icon: <RiTailwindCssFill />, name: 'Tailwind' },
				{ icon: <SiNestjs />, name: 'Nest.js' },
				{ icon: <FaWordpress />, name: 'Wordpress' },
				{ icon: <SiRabbitmq />, name: 'RabbitMQ' },
				{ icon: <SiOracle />, name: 'Oracle Fusion' },
				{ icon: <SiOracle />, name: 'Oracle Visual Builder' },
				{ icon: <SiOracle />, name: 'Oracle APEX' },
				{ icon: <SiOracle />, name: 'Integration Cloud' },
				{ icon: <SiOracle />, name: 'Oracle OTBI' },
			],
		},
		{
			heading: 'Cloud Platforms & Deployment',
			items: [
				{ icon: <FaAws />, name: 'AWS' },
				{ icon: <FaDigitalOcean />, name: 'Digital Ocean' },
				{ icon: <FaCloudflare />, name: 'Cloudflare' },
				{ icon: <SiCloudflareworkers />, name: 'CF Workers' },
				{ icon: <FaDocker />, name: 'Docker' },
				{ icon: <FaGithub />, name: 'Git / GitHub' },
				{ icon: <SiJfrogpipelines />, name: 'CI/CD' },
			],
		},
		{
			heading: 'Databases',
			items: [
				{ icon: <BiLogoPostgresql />, name: 'PostgreSQL' },
				{ icon: <GrMysql />, name: 'MySQL' },
				{ icon: <SiMongodb />, name: 'MongoDB' },
				{ icon: <DiRedis />, name: 'Redis' },
				{ icon: <SiElasticsearch />, name: 'Elasticsearch' },
				{ icon: <FaDatabase />, name: 'Oracle DB' },
			],
		},
		{
			heading: 'Languages',
			items: [
				{ icon: <IoLogoJavascript />, name: 'JavaScript' },
				{ icon: <SiTypescript />, name: 'TypeScript' },
				{ icon: <IoLogoHtml5 />, name: 'HTML5' },
				{ icon: <FaCss3 />, name: 'CSS3' },
				{ icon: <FaPython />, name: 'Python' },
				{ icon: <TbBrandCSharp />, name: 'C#' },
				{ icon: <FaPhp />, name: 'PHP' },
				{ icon: <FaFileExcel />, name: 'VBA' },
				{ icon: <TbSql />, name: 'SQL' },
			],
		},
		{
			heading: 'Soft Skills',
			items: [
				{ icon: <FaCheck />, name: 'Problem Solving' },
				{ icon: <RiSpeakAiFill />, name: 'Communication' },
				{ icon: <LuBlocks />, name: 'Teamwork' },
				{ icon: <GiBullseye />, name: 'Attention to Detail' },
				{ icon: <GiGrowth />, name: 'Self-Motivation' },
			],
		},
	]

	return (
		<div className='w-full flex flex-col justify-center items-center'>
			<SubHeading text='Skills & Technologies' />
			{skills.map((block, i) => (
				<SkillGroup key={block.heading} block={block} groupIndex={i} />
			))}
		</div>
	)
}

export default SkillsSection
