'use client'
import { recommendations, RecommendationType } from '@/recommendation-data'
import SubHeading from './SubHeading'
import Autoplay from 'embla-carousel-autoplay'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'

function RecommendationsSection() {
	return (
		<div className='flex flex-col items-center justify-center space-y-4'>
			<SubHeading text='Recommendations' />
			<Carousel
				plugins={[
					Autoplay({
						delay: 5000,
					}),
				]}
				opts={{ loop: true }}
				orientation='horizontal'
				className='w-full lg:w-[50%]  relative '
			>
				<CarouselContent className=' rounded-lg'>
					{recommendations.map((recommendation, index) => (
						<CarouselItem key={`recommendation-${index}`}>
							<RecommendationCard recommendation={recommendation} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselNext className='lg:flex hidden' />
				<CarouselPrevious className='lg:flex hidden' />
			</Carousel>
		</div>
	)
}

export function RecommendationCard({
	recommendation,
}: {
	recommendation: RecommendationType
}) {
	return (
		<div className='flex flex-col gap-2 items-start bg-white/10 backdrop-blur-lg rounded-lg p-4 w-full '>
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
			<p className='text-sm text-primary text-wrap'>
				{recommendation.recommendation}
			</p>
		</div>
	)
}
export default RecommendationsSection
