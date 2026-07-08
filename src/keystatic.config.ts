import { config, fields, collection } from '@keystatic/core'

export default config({
	storage: {
		kind: 'local',
	},
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
