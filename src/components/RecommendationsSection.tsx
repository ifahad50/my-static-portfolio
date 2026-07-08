'use client'

import { recommendations, RecommendationType } from '@/recommendation-data'
import SubHeading from './SubHeading'
import { ScrollArea } from './ui/scroll-area'
import GalaxyCard from './GalaxyCard'
import { FaQuoteLeft } from 'react-icons/fa6'

export function RecommendationCard({ recommendation }: { recommendation: RecommendationType }) {
	return (
		<GalaxyCard className='flex flex-col gap-3 p-4 md:p-5 w-full mb-3'>
			<FaQuoteLeft className='text-white/20 text-lg shrink-0' />
			<p className='text-sm text-white/65 leading-relaxed italic'>{recommendation.recommendation}</p>
			<div className='flex items-center gap-3 pt-1 border-t border-white/[0.06]'>
				<img
					className='w-10 h-10 object-cover rounded-full border border-white/15'
					src={recommendation.image}
					alt={recommendation.name}
				/>
				<div>
					<p className='text-sm font-semibold text-white'>{recommendation.name}</p>
					<p className='text-[11px] text-white/40 leading-tight'>{recommendation.designation}</p>
				</div>
			</div>
		</GalaxyCard>
	)
}

function RecommendationsSection() {
	return (
		<div className='flex flex-col items-center justify-center'>
			<SubHeading text='Recommendations' />
			<ScrollArea className='w-full max-w-3xl max-h-[560px] rounded-xl pr-1'>
				{recommendations.map((rec, i) => (
					<RecommendationCard key={`${i}-${rec.name}`} recommendation={rec} />
				))}
			</ScrollArea>
		</div>
	)
}

export default RecommendationsSection
