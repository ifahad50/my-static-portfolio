'use client'
import Particles from './reactBits/Backgrounds/Particles/Particles'

export default function ParticlesBackground() {
	return (
		<div className='fixed inset-0 w-full h-full -z-10 overflow-hidden'>
			<Particles
				particleColors={['#ffffff', '#ffffff']}
				particleCount={2000}
				particleSpread={10}
				speed={0.05}
				particleBaseSize={100}
				moveParticlesOnHover={false}
				alphaParticles={true}
				disableRotation={false}
			/>
		</div>
	)
}
