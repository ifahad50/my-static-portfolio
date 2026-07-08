import type { Metadata } from 'next'
import { Montserrat, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import siteSettings from '@/site-setting'

const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
	display: 'swap',
	variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
	display: 'swap',
	variable: '--font-mono',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={`${montserrat.variable} ${jetbrainsMono.variable} font-sans antialiased`}>{children}</body>
		</html>
	)
}
