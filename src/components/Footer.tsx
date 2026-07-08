import ContactBlocks from './ContactBlocks'

function Footer() {
	return (
		<footer className='w-full py-8 pb-28 md:pb-12 mt-20 border-t border-white/[0.05]'>
			<div className='max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4'>
				<div className='flex flex-col gap-1 items-center md:items-start'>
					<span className='font-mono text-xs text-white/30'>{'// Fahad Iqbal'}</span>
					<span className='text-xs text-white/30'>© {new Date().getFullYear()} · Full-Stack Developer · Australia</span>
				</div>
				<ContactBlocks />
			</div>
		</footer>
	)
}

export default Footer
