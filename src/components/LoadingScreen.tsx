// Server component — CSS-only, no client JS needed during loading
export default function LoadingScreen() {
	return (
		<div
			className='fixed inset-0 bg-black flex items-center justify-center overflow-hidden'
			aria-label='Loading'
		>
			{/* ── Corner HUD brackets ── */}
			<div className='absolute top-7 left-7 w-7 h-7 border-t border-l border-white/22' />
			<div className='absolute top-7 right-7 w-7 h-7 border-t border-r border-white/22' />
			<div className='absolute bottom-7 left-7 w-7 h-7 border-b border-l border-white/22' />
			<div className='absolute bottom-7 right-7 w-7 h-7 border-b border-r border-white/22' />

			{/* ── Corner meta labels ── */}
			<span className='absolute top-7 left-16 font-mono text-[9px] text-white/18 tracking-[0.22em] pt-px'>SYS_BOOT</span>
			<span className='absolute bottom-7 right-16 font-mono text-[9px] text-white/18 tracking-[0.22em] pb-px'>v1.0.3</span>

			{/* ── Subtle grid overlay (same as galaxy background) ── */}
			<div
				aria-hidden='true'
				className='absolute inset-0 opacity-[0.014] pointer-events-none'
				style={{
					backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
					backgroundSize: '80px 80px',
				}}
			/>

			{/* ── Centre content ── */}
			<div className='flex flex-col items-center gap-8'>

				{/* Spinner ring + monogram */}
				<div className='relative flex items-center justify-center' style={{ width: 88, height: 88 }}>

					{/* Outermost slow-reversing dashed ring */}
					<div
						aria-hidden='true'
						className='absolute rounded-full border border-dashed border-white/10'
						style={{
							inset: -14,
							animation: 'load-spin-rev 12s linear infinite',
						}}
					/>

					{/* Static faint base ring */}
					<div aria-hidden='true' className='absolute inset-0 rounded-full border border-white/[0.07]' />

					{/* Fast spinning solid arc */}
					<div
						aria-hidden='true'
						className='absolute inset-0 rounded-full'
						style={{
							border: '1.5px solid transparent',
							borderTopColor: 'rgba(255,255,255,0.75)',
							borderLeftColor: 'rgba(255,255,255,0.25)',
							animation: 'load-spin 1.2s linear infinite',
						}}
					/>

					{/* Monogram */}
					<div className='flex flex-col items-center'>
						<span className='font-mono text-[15px] font-bold text-white/85 tracking-[0.18em]'>FI</span>
					</div>
				</div>

				{/* Name + subtitle */}
				<div className='text-center space-y-1.5'>
					<p className='font-mono text-[13px] font-semibold text-white/75 tracking-[0.35em] uppercase'>
						Fahad Iqbal
					</p>
					<p className='font-mono text-[9px] text-white/28 tracking-[0.28em] uppercase'>
						Portfolio &nbsp;·&nbsp; Full-Stack Developer
					</p>
				</div>

				{/* Progress shimmer bar + status */}
				<div className='flex flex-col items-center gap-2.5' style={{ width: 192 }}>
					{/* Bar */}
					<div className='relative w-full h-px bg-white/[0.07] overflow-hidden rounded-full'>
						{/* Travelling shimmer */}
						<div
							aria-hidden='true'
							className='absolute top-0 bottom-0 rounded-full'
							style={{
								width: '28%',
								background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.65), transparent)',
								animation: 'load-shimmer 1.6s ease-in-out infinite',
							}}
						/>
					</div>

					{/* Status line */}
					<p className='font-mono text-[9px] text-white/22 tracking-[0.2em]'>
						{'$ initializing'}
						<span style={{ animation: 'boot-blink 1s step-end infinite' }}>_</span>
					</p>
				</div>

			</div>
		</div>
	)
}
