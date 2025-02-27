'use client'

import { FaLinkedinIn } from 'react-icons/fa6'
import { SiGmail } from 'react-icons/si'
import { TbFileCv } from 'react-icons/tb'
import Link from 'next/link'
import siteSettings from '@/site-setting'
import PixelCard from './reactBits/components/PixelCard/PixelCard'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip'

export interface contactBlockContentProps {
	name: string
	icon: React.ReactNode
	link: string
	target?: string
}

export default function ContactBlocks() {
	const contactBlocksContent: contactBlockContentProps[] = [
		{
			name: 'LinkedIn',
			icon: <FaLinkedinIn className='text-white text-2xl' />,
			link: siteSettings.contact.linkedin,
			target: '_blank',
		},
		{
			name: 'Gmail',
			icon: <SiGmail className='text-white text-2xl' />,
			link: siteSettings.contact.gmail,
		},
		{
			name: 'CV',
			icon: <TbFileCv className='text-white text-3xl' />,
			link: siteSettings.contact.cv,
			target: '_blank',
		},
	]
	return (
		<div className='relative flex justify-center items-center space-x-2'>
			{contactBlocksContent.map((contact: contactBlockContentProps) => (
				<Link key={contact.name} href={contact.link} target={contact.target}>
					<PixelCard
						variant='default'
						className='max-h-20 max-w-20 rounded-full'
					>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<div className='absolute flex flex-col items-center justify-center gap-4'>
										<div>{contact.icon}</div>
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<p>{contact.name}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</PixelCard>
				</Link>
			))}
		</div>
	)
}
