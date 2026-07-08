import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import ParticlesBackground from '@/components/ParticlesBackground'

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ParticlesBackground />
			<main className='mx-6'>{children}</main>
			<Footer />
			<NavBar />
		</>
	)
}
