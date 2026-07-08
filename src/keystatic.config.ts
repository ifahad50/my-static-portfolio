import { config, fields, collection } from '@keystatic/core'

const githubRepo =
	process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO ??
	// Optional alternate env var name; safe to keep as non-public since this file is still bundled.
	(process.env as unknown as { NEXT_PUBLIC_KEYSTATIC_REPO?: string }).NEXT_PUBLIC_KEYSTATIC_REPO ??
	''

const useGithubStorage = typeof githubRepo === 'string' && githubRepo.includes('/')

const storage = useGithubStorage
	? ({
			kind: 'github',
			// Keystatic expects a RepoConfig type (either `${owner}/${name}` or { owner, name }).
			// We accept the `${owner}/${name}` string from env and cast accordingly.
			repo: githubRepo as `${string}/${string}`,
	  }) as const
	: ({ kind: 'local' }) as const

export default config({
	storage,
	collections: {
		projects: collection({
			label: 'Projects',
			slugField: 'title',
			path: 'content/projects/*/',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				headerImage: fields.image({
					label: 'Header Image',
					directory: 'public/project-assets',
					publicPath: '/project-assets/',
				}),
				technologiesUsed: fields.array(
					fields.text({ label: 'Technology' }),
					{ label: 'Technologies', itemLabel: (props) => props.value ?? 'Technology' }
				),
				headerDescription: fields.text({
					label: 'Header Description',
					multiline: true,
				}),
				content: fields.markdoc({ label: 'Details' }),
			},
		}),
		posts: collection({
			label: 'Posts',
			slugField: 'title',
			path: 'content/posts/*/',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				publishedAt: fields.date({ label: 'Published At' }),
				excerpt: fields.text({ label: 'Excerpt', multiline: true }),
				coverImage: fields.image({
					label: 'Cover Image',
					directory: 'public/blog-assets',
					publicPath: '/blog-assets/',
				}),
				content: fields.markdoc({ label: 'Content' }),
			},
		}),
	},
})
