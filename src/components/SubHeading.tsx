function SubHeading({ text, className }: { text: string; className?: string }) {
	return (
		<h3
			className={`text-xl md:text-2xl font-bold text-center my-10 ${className}`}
		>
			{text}
		</h3>
	)
}

export default SubHeading
