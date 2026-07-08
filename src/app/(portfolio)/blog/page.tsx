import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/keystatic'
import SubHeading from '@/components/SubHeading'
import PixelCard from '@/components/reactBits/components/PixelCard/PixelCard'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { format } from 'date-fns'
import GalaxyCard from '@/components/GalaxyCard'

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Blog posts and articles',
	openGraph: {
		images: ['/header_image.jpeg'],
	},
}

export default async function BlogPage() {
	const posts = await getAllPosts()
	return (
		<div className='flex flex-col gap-2 md:gap-4'>
			<SubHeading text='Blog' />
			<div className='flex flex-wrap gap-4 justify-center'>
				{posts.length === 0 ? (
					<p className='text-sm text-primary/80'>No posts yet. Add some in the Keystatic admin at /keystatic.</p>
				) : (
					posts.map((post) => (
						<GalaxyCard
							className='space-y-2 flex flex-col items-center gap-4 w-full md:w-1/3 cursor-pointer min-h-[6rem] md:h-[35rem]'
							key={post.slug}
						>
							<Link className='w-full' href={`/blog/${post.slug}`}>
								{post.coverImage ? (
									<img
										className='w-full h-[300px] object-cover rounded-lg'
										src={post.coverImage}
										alt={post.title}
										width={300}
										height={300}
									/>
								) : (
									<div className='w-full h-[300px] rounded-lg bg-white/5 flex items-center justify-center'>
										<span className='text-primary/50 text-sm'>No image</span>
									</div>
								)}
							</Link>
							<div className='p-2 md:p-4 flex flex-col gap-2 w-full'>
								<Link href={`/blog/${post.slug}`}>
									<p className='text-lg text-start w-full line-clamp-1 font-bold'>{post.title}</p>
								</Link>
								{post.publishedAt && (
									<p className='text-xs text-primary/70'>{format(new Date(post.publishedAt), 'PPP')}</p>
								)}
								<hr className='border-gray-200 w-full' />
								<p className='text-sm text-start w-full line-clamp-6 min-h-[7rem]'>{post.excerpt}</p>
								<Link href={`/blog/${post.slug}`}>
									<PixelCard className='max-h-10 max-w-10 rounded-full'>
										<FaArrowUpRightFromSquare className='absolute' />
									</PixelCard>
								</Link>
							</div>
						</GalaxyCard>
					))
				)}
			</div>
		</div>
	)
}
