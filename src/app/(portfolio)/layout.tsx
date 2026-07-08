import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import GalaxyBackground from '@/components/GalaxyBackground'

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<GalaxyBackground />
			<main className='max-w-7xl mx-auto px-6'>{children}</main>
			<Footer />
			<NavBar />
		</>
	)
}
