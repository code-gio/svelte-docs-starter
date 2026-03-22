import RocketIcon from '@lucide/svelte/icons/rocket';
import BookOpenIcon from '@lucide/svelte/icons/book-open';
import type { DocsConfig } from './types.js';

export const docsConfig: DocsConfig = {
	site: {
		title: 'Documentation',
		description: 'A modern documentation starter built with SvelteKit.',
		social: {
			github: 'https://github.com/code-gio/svelte-docs-starter'
		}
	},
	sidebar: [
		{
			label: 'Getting Started',
			icon: RocketIcon,
			autogenerate: { directory: 'getting-started' }
		},
		{
			label: 'Guides',
			icon: BookOpenIcon,
			autogenerate: { directory: 'guides' }
		}
	],
	toc: {
		minDepth: 2,
		maxDepth: 3
	}
};
