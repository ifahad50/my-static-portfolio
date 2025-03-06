'use client'
import { recommendations, RecommendationType } from '@/recommendation-data'
import SubHeading from './SubHeading'
import { ScrollArea } from './ui/scroll-area'

function RecommendationsSection() {
	return (
		<div className='flex flex-col items-center justify-center space-y-4'>
			<SubHeading text='Recommendations' />
			<ScrollArea className='flex flex-col  max-w-4xl max-h-[600px] rounded-lg'>
				{recommendations.map((rec, i) => (
					<RecommendationCard key={`${i}-${rec.name}`} recommendation={rec} />
				))}
			</ScrollArea>
		</div>
	)
}

export function RecommendationCard({
	recommendation,
}: {
	recommendation: RecommendationType
}) {
	return (
		<div className='flex flex-col gap-2 items-start bg-white/10 backdrop-blur-lg rounded-lg p-4 w-full mb-4'>
			<div className='flex flex-row gap-2 items-center'>
				<img
					className='w-[100px] h-[100px] object-cover rounded-lg shadow-2xl'
					src={recommendation.image}
					alt={recommendation.name}
				/>
				<div className='flex flex-col '>
					<h3 className='text-lg font-bold '>{recommendation.name}</h3>

					<p className='text-xs text-white/50 text-wrap'>
						{recommendation.designation}
					</p>
				</div>
			</div>
			<p className='text-sm text-primary text-wrap'>
				{recommendation.recommendation}
			</p>
		</div>
	)
}
export default RecommendationsSection
