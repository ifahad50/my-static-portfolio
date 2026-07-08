import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import Markdoc from '@markdoc/markdoc'
import { getPostBySlug, getAllPostSlugs } from '@/lib/keystatic'
import Heading from '@/components/Heading'
import PixelCard from '@/components/reactBits/components/PixelCard/PixelCard'
import { FaArrowLeft } from 'react-icons/fa6'
import { format } from 'date-fns'
import GalaxyCard from '@/components/GalaxyCard'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
	const slugs = await getAllPostSlugs()
	// Need at least one entry for output: 'export' to not error when there are no posts yet.
	if (slugs.length === 0) return [{ slug: '__placeholder' }]
	return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const post = await getPostBySlug(slug)
	if (!post) return { title: 'Post' }
	return {
		title: post.title,
		description: post.excerpt?.slice(0, 160),
	}
}

export default async function BlogPostPage({ params }: Props) {
	const { slug } = await params
	if (slug === '__placeholder') notFound()
	const post = await getPostBySlug(slug)
	if (!post) notFound()

	const contentResult = await post.content()
	const node = contentResult?.node
	let contentReact = null
	if (node) {
		const errors = Markdoc.validate(node)
		if (errors.length) console.error('Markdoc validation errors:', errors)
		const renderable = Markdoc.transform(node)
		contentReact = Markdoc.renderers.react(renderable, React)
	}

	const coverImage = post.coverImage
		? post.coverImage.startsWith('/') || post.coverImage.startsWith('http')
			? post.coverImage
			: '/blog-assets/' + post.coverImage
		: null

	return (
		<div className='flex flex-col items-start justify-center space-y-4 max-w-screen-xl mx-auto'>
			<Heading text={post.title} className='w-full !mb-2' />
			{post.publishedAt && (
				<p className='text-sm text-primary/70'>{format(new Date(post.publishedAt), 'PPP')}</p>
			)}
			{coverImage && (
				<img
					src={coverImage}
					alt={post.title}
					width={100}
					height={100}
					className='w-full mx-auto h-auto max-h-[600px] rounded-lg object-cover'
				/>
			)}
			{post.excerpt && (
				<GalaxyCard className='w-full p-2 md:p-4'>
					<p className='text-sm md:text-lg'>{post.excerpt}</p>
				</GalaxyCard>
			)}
			{contentReact && (
				<GalaxyCard className='w-full p-2 md:p-4'>
					<div className='prose prose-invert text-sm md:text-lg'>{contentReact}</div>
				</GalaxyCard>
			)}
			<Link href='/blog' className='flex flex-row items-center justify-center gap-2'>
				<PixelCard className='max-h-10 max-w-10 rounded-full'>
					<FaArrowLeft className='absolute' />
				</PixelCard>
				<span className='text-sm text-primary'>Back to Blog</span>
			</Link>
		</div>
	)
}
