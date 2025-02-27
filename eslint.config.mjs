import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		rules: {
			// ... existing rules ...
			'@typescript-eslint/no-explicit-any': 'off', // Allow usage of 'any' type
			'@typescript-eslint/ban-ts-comment': 'off', // Allow all ts-comments
			'@typescript-eslint/no-unused-vars': 'off', // Disable unused vars check
		},
	},
]

export default eslintConfig
