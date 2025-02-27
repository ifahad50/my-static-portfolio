import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import ParticlesBackground from '@/components/ParticlesBackground'

const montserrat = Montserrat({
	weight: '400',
	subsets: ['latin'],
})
export const metadata: Metadata = {
	title: 'Fahad Iqbal',
	description: 'Fahad Iqbal',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={montserrat.className}>
				<ParticlesBackground />
				<main className='mx-6'>{children}</main>
				<Footer />
				{/* <NavBar /> */}
			</body>
		</html>
	)
}
