function Heading({ text, className }: { text: string; className?: string }) {
	return (
		<h1
			className={`text-2xl md:text-3xl font-bold text-center my-10 ${className}`}
		>
			{text}
		</h1>
	)
}

export default Heading
