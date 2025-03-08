import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import ParticlesBackground from '@/components/ParticlesBackground'
import siteSettings from '@/site-setting'

const montserrat = Montserrat({
	weight: '400',
	subsets: ['latin'],
})
export const metadata: Metadata = {
	title: 'Fahad Iqbal',
	description: `Hi, I am a ${siteSettings.position}`,
	authors: [{ name: 'Fahad Iqbal' }],
	creator: 'Fahad Iqbal',
	publisher: 'Fahad Iqbal',
	openGraph: {
		images: '/header_image.jpeg',
	},
	metadataBase: new URL('https://fahadiqbal.dev'),
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
				<NavBar />
			</body>
		</html>
	)
}
