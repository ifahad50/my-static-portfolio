function Heading({ text, className }: { text: string; className?: string }) {
	return (
		<h1 className={`text-3xl md:text-5xl font-extrabold text-center tracking-tight text-gradient-galaxy ${className ?? ''}`}>
			{text}
		</h1>
	)
}

export default Heading
