import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import Markdoc from '@markdoc/markdoc'
import Project from '@/components/Project'
import { getProjectBySlug, getAllProjectSlugs, getProjectEntry } from '@/lib/keystatic'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
	const slugs = await getAllProjectSlugs()
	if (slugs.length === 0) return [{ slug: '__placeholder' }]
	return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const project = await getProjectBySlug(slug)
	if (!project) return { title: 'Project' }
	return {
		title: project.title,
		description: project.headerDescription.slice(0, 160),
	}
}

export default async function ProjectPage({ params }: Props) {
	const { slug } = await params
	if (slug === '__placeholder') notFound()
	const [project, entry] = await Promise.all([getProjectBySlug(slug), getProjectEntry(slug)])
	if (!project || !entry) notFound()

	const contentResult = await entry.content()
	const node = contentResult?.node
	let contentNode = null
	if (node) {
		const errors = Markdoc.validate(node)
		if (errors.length) console.error('Markdoc validation errors:', errors)
		const renderable = Markdoc.transform(node)
		contentNode = Markdoc.renderers.react(renderable, React)
	}

	return <Project project={project} contentNode={contentNode} />
}
