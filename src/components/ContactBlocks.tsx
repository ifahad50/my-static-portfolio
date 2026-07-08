'use client'

import { FaLinkedinIn } from 'react-icons/fa6'
import { SiGmail } from 'react-icons/si'
import { TbFileCv } from 'react-icons/tb'
import Link from 'next/link'
import siteSettings from '@/site-setting'

const contacts = [
	{
		name: 'LinkedIn',
		icon: <FaLinkedinIn className='text-lg' />,
		link: siteSettings.contact.linkedin,
		target: '_blank',
	},
	{
		name: 'Gmail',
		icon: <SiGmail className='text-lg' />,
		link: siteSettings.contact.gmail,
		target: undefined,
	},
	{
		name: 'CV',
		icon: <TbFileCv className='text-xl' />,
		link: siteSettings.contact.cv,
		target: '_blank',
	},
]

export default function ContactBlocks() {
	return (
		<div className='flex items-center gap-3'>
			{contacts.map((c) => (
				<Link
					key={c.name}
					href={c.link}
					target={c.target}
					className='flex items-center gap-2 px-4 py-2 rounded-lg border border-white/[0.1] bg-white/[0.04] text-white/70 text-sm font-medium backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-white/[0.09] hover:text-white'
				>
					{c.icon}
					<span>{c.name}</span>
				</Link>
			))}
		</div>
	)
}
