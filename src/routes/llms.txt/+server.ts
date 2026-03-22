import { docsConfig } from '$lib/docs/config.js';
import type { RequestHandler } from './$types';

interface DocEntry {
	slug: string;
	title: string;
	description: string;
	order: number;
	section: string;
}

function extractFrontmatter(content: string): { title: string; description: string; order: number } {
	const match = content.match(/^---\n([\s\S]*?)\n---/);
	if (!match) return { title: '', description: '', order: 999 };

	const fm = match[1];
	const title = fm.match(/title:\s*(.+)/)?.[1]?.trim().replace(/^['"]|['"]$/g, '') ?? '';
	const description = fm.match(/description:\s*(.+)/)?.[1]?.trim().replace(/^['"]|['"]$/g, '') ?? '';
	const order = parseInt(fm.match(/order:\s*(\d+)/)?.[1] ?? '999');

	return { title, description, order };
}

export const GET: RequestHandler = async ({ url }) => {
	const files = import.meta.glob('/src/content/docs/**/*.md', { query: '?raw', eager: true, import: 'default' }) as Record<string, string>;

	const entries: DocEntry[] = [];

	for (const [path, raw] of Object.entries(files)) {
		const slug = path
			.replace('/src/content/docs/', '')
			.replace(/\.md$/, '')
			.replace(/\/index$/, '');

		const { title, description, order } = extractFrontmatter(raw);

		const parts = slug.split('/');
		const section = parts.length > 1 ? parts[0] : '';

		entries.push({ slug, title, description, order, section });
	}

	entries.sort((a, b) => a.order - b.order);

	const siteTitle = docsConfig.site.title;
	const siteDesc = docsConfig.site.description;
	const baseUrl = url.origin;

	const lines: string[] = [];
	lines.push(`# ${siteTitle}`);
	lines.push('');
	lines.push(`> ${siteDesc}`);
	lines.push('');
	lines.push(`This file provides an overview of all documentation pages for LLM consumption.`);
	lines.push(`For full documentation content, see: ${baseUrl}/llms-full.txt`);
	lines.push('');

	const sections = new Map<string, DocEntry[]>();
	for (const entry of entries) {
		const key = entry.section || '_root';
		if (!sections.has(key)) sections.set(key, []);
		sections.get(key)!.push(entry);
	}

	const rootEntries = sections.get('_root');
	if (rootEntries) {
		for (const entry of rootEntries) {
			lines.push(`- [${entry.title}](${baseUrl}/docs): ${entry.description}`);
		}
		lines.push('');
		sections.delete('_root');
	}

	for (const [section, sectionEntries] of sections) {
		const label = docsConfig.sidebar.find(
			(s) => s.autogenerate?.directory === section
		)?.label ?? section.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

		lines.push(`## ${label}`);
		lines.push('');
		for (const entry of sectionEntries) {
			lines.push(`- [${entry.title}](${baseUrl}/docs/${entry.slug}): ${entry.description}`);
		}
		lines.push('');
	}

	return new Response(lines.join('\n'), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};

export const prerender = true;
