'use client'

import { GanttChart, Home, Phone } from 'lucide-react'
import Dock from './reactBits/components/Dock/Dock'
import siteSettings from '@/site-setting'

const menuItems = [
	{
		icon: <Home />,
		label: 'Home',
		link: '/',
	},
	{
		icon: <GanttChart />,
		label: 'Projects',
		link: '/projects',
	},
	{
		icon: <Phone />,
		label: 'Contact',
		link: siteSettings.contact.gmail,
	},
]

function NavBar() {
	return (
		<div className='flex fixed w-full bottom-0 left-0 justify-center items-center text-white z-50 '>
			<Dock
				items={menuItems}
				panelHeight={68}
				baseItemSize={50}
				magnification={0}
				distance={0}
				className='bg-white/10 backdrop-blur-lg'
			/>
		</div>
	)
}

export default NavBar
