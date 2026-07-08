import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '@/keystatic.config'
import type { ProjectType } from '@/types/project'

const reader = createReader(process.cwd(), keystaticConfig)

export { reader }

export async function getAllProjectSlugs(): Promise<string[]> {
	const list = await reader.collections.projects.list()
	return list
}

function normalizeImagePath(value: string | undefined, publicPath: string): string {
	if (!value) return ''
	if (value.startsWith('/') || value.startsWith('http')) return value
	return publicPath + value
}

export async function getProjectBySlug(slug: string): Promise<ProjectType | null> {
	const entry = await reader.collections.projects.read(slug)
	if (!entry) return null
	return {
		slug,
		title: entry.title,
		headerImage: normalizeImagePath(entry.headerImage, '/project-assets/'),
		technologiesUsed: entry.technologiesUsed ?? [],
		headerDescription: entry.headerDescription ?? '',
	}
}

export async function getProjectEntry(slug: string) {
	return reader.collections.projects.read(slug)
}

export async function getAllProjects(): Promise<ProjectType[]> {
	const entries = await reader.collections.projects.all()
	const projects: ProjectType[] = []
	for (const { slug, entry } of entries) {
		projects.push({
			slug,
			title: entry.title,
			headerImage: normalizeImagePath(entry.headerImage, '/project-assets/'),
			technologiesUsed: entry.technologiesUsed ?? [],
			headerDescription: entry.headerDescription ?? '',
		})
	}
	return projects
}

export async function getAllPostSlugs(): Promise<string[]> {
	return reader.collections.posts.list()
}

export async function getPostBySlug(slug: string) {
	return reader.collections.posts.read(slug)
}

function normalizeBlogImage(value: string | undefined): string | undefined {
	if (!value) return undefined
	if (value.startsWith('/') || value.startsWith('http')) return value
	return '/blog-assets/' + value
}

export async function getAllPosts(): Promise<Array<{ slug: string; title: string; publishedAt: string; excerpt: string; coverImage?: string }>> {
	const entries = await reader.collections.posts.all()
	return entries
		.map(({ slug, entry }) => ({
			slug,
			title: entry.title,
			publishedAt: entry.publishedAt ?? '',
			excerpt: entry.excerpt ?? '',
			coverImage: normalizeBlogImage(entry.coverImage),
		}))
		.sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
}
