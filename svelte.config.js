import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';
import { transformerNotationHighlight, transformerMetaHighlight } from '@shikijs/transformers';

const highlighter = await createHighlighter({
	themes: ['github-dark', 'github-light'],
	langs: [
		'typescript',
		'javascript',
		'svelte',
		'bash',
		'json',
		'css',
		'html',
		'markdown',
		'yaml',
		'shell'
	]
});

/**
 * @param {string} code
 * @param {string | undefined} lang
 * @param {string | undefined} meta
 */
function codeHighlighter(code, lang, meta) {
	// Parse title from meta: title="filename.ts"
	const titleMatch = meta?.match(/title="([^"]+)"/);
	const title = titleMatch?.[1];

	const html = highlighter.codeToHtml(code, {
		lang: lang || 'text',
		themes: { light: 'github-light', dark: 'github-dark' },
		meta: meta ? { __raw: meta } : undefined,
		transformers: [transformerMetaHighlight(), transformerNotationHighlight()]
	});

	let result = html;

	// Wrap with title header if present
	if (title) {
		result = `<div class="code-block-titled"><div class="code-block-title">${title}</div>${result}</div>`;
	}

	return `{@html \`${result.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`}`;
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [
		mdsvex({
			extensions: ['.md', '.svx'],
			highlight: {
				highlighter: codeHighlighter
			}
		})
	],
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: 'warn',
			handleUnseenRoutes: 'warn'
		}
	},
	vitePlugin: {
		dynamicCompileOptions: ({ filename }) =>
			filename.includes('node_modules') ? undefined : { runes: true }
	}
};

export default config;
