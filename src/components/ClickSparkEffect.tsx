'use client'
import ClickSpark from './reactBits/Animations/ClickSpark/ClickSpark'

function ClickSparkEffect() {
	return (
		<ClickSpark
			sparkColor='#fff'
			sparkSize={10}
			sparkRadius={15}
			sparkCount={8}
			duration={400}
		/>
	)
}

export default ClickSparkEffect
