import ContactBlocks from './ContactBlocks'

function Footer() {
	return (
		<footer className='w-full py-8 bg-primary/10 backdrop-blur-lg mt-20'>
			<div className='max-w-7xl mx-auto px-4'>
				<div className='flex flex-col md:flex-row justify-between items-center gap-4'>
					<div className='text-sm text-gray-400'>
						© 2019 Fahad Iqbal. All rights reserved.
					</div>
					<ContactBlocks />
				</div>
			</div>
		</footer>
	)
}

export default Footer
