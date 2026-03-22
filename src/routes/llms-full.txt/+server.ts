import { docsConfig } from '$lib/docs/config.js';
import type { RequestHandler } from './$types';

interface DocEntry {
	slug: string;
	title: string;
	content: string;
	order: number;
	section: string;
}

function parseFrontmatterAndContent(raw: string): { title: string; order: number; content: string } {
	const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
	if (!match) return { title: '', order: 999, content: raw };

	const fm = match[1];
	const content = match[2].trim();
	const title = fm.match(/title:\s*(.+)/)?.[1]?.trim().replace(/^['"]|['"]$/g, '') ?? '';
	const order = parseInt(fm.match(/order:\s*(\d+)/)?.[1] ?? '999');

	return { title, order, content };
}

export const GET: RequestHandler = async ({ url }) => {
	const files = import.meta.glob('/src/content/docs/**/*.md', { query: '?raw', eager: true, import: 'default' }) as Record<string, string>;

	const entries: DocEntry[] = [];

	for (const [path, raw] of Object.entries(files)) {
		const slug = path
			.replace('/src/content/docs/', '')
			.replace(/\.md$/, '')
			.replace(/\/index$/, '');

		const { title, order, content } = parseFrontmatterAndContent(raw);

		const parts = slug.split('/');
		const section = parts.length > 1 ? parts[0] : '';

		entries.push({ slug, title, content, order, section });
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
	lines.push(`Source: ${baseUrl}`);
	lines.push('');

	const sections = new Map<string, DocEntry[]>();
	for (const entry of entries) {
		const key = entry.section || '_root';
		if (!sections.has(key)) sections.set(key, []);
		sections.get(key)!.push(entry);
	}

	for (const [section, sectionEntries] of sections) {
		if (section !== '_root') {
			const label = docsConfig.sidebar.find(
				(s) => s.autogenerate?.directory === section
			)?.label ?? section.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

			lines.push(`---`);
			lines.push('');
			lines.push(`# ${label}`);
			lines.push('');
		}

		for (const entry of sectionEntries) {
			lines.push(`## ${entry.title}`);
			lines.push(`URL: ${baseUrl}/docs/${entry.slug === 'index' ? '' : entry.slug}`);
			lines.push('');
			lines.push(entry.content);
			lines.push('');
		}
	}

	return new Response(lines.join('\n'), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};

export const prerender = true;
