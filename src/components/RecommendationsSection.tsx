'use client'
import { recommendations, RecommendationType } from '@/recommendation-data'
import SubHeading from './SubHeading'
import { ScrollArea } from './ui/scroll-area'
import RollingGallery from './reactBits/components/RollingGallery/RollingGallery'

function RecommendationsSection() {
	return (
		<div>
			<SubHeading text='Recommendations' />
			<RollingGallery
				recommendations={recommendations}
				autoplay={true}
				pauseOnHover={true}
			/>
		</div>
	)
}

export function RecommendationCard({
	recommendation,
}: {
	recommendation: RecommendationType
}) {
	return (
		<div className='flex flex-col gap-2 items-center bg-white/10 backdrop-blur-lg rounded-lg p-4 w-full md:w-[400px]'>
			<div className='flex flex-row gap-2 items-center'>
				<img
					className='w-[100px] h-[100px] object-cover rounded-lg shadow-2xl'
					src={recommendation.image}
					alt={recommendation.name}
				/>
				<div className='flex flex-col '>
					<h3 className='text-lg font-bold '>{recommendation.name}</h3>

					<p className='text-xs text-white/50'>{recommendation.designation}</p>
				</div>
			</div>
			<ScrollArea className='h-[200px] md:w-[380px] rounded-md border p-2'>
				<p className='text-sm text-primary'>{recommendation.recommendation}</p>
			</ScrollArea>
		</div>
	)
}
export default RecommendationsSection
