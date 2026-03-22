import { docsConfig } from './config.js';
import type { DocFile, DocMeta, DocPage } from './types.js';

const contentModules = import.meta.glob<DocFile>('/src/content/docs/**/*.{md,svx}', {
	eager: true
});

const rawModules = import.meta.glob<string>('/src/content/docs/**/*.{md,svx}', {
	query: '?raw',
	eager: true,
	import: 'default'
});

const localizedModules = import.meta.glob<DocFile>('/src/content/docs-*/**/*.{md,svx}', {
	eager: true
});

function slugFromPath(path: string, prefix: string): string {
	return path
		.replace(prefix, '')
		.replace(/\.(md|svx)$/, '')
		.replace(/(?:^|\/)index$/, '');
}

function buildDocs(modules: Record<string, DocFile>, prefix: string, hrefPrefix: string): DocPage[] {
	const docs: DocPage[] = [];

	for (const [path, mod] of Object.entries(modules)) {
		const meta = mod.metadata as DocMeta;
		if (meta?.draft) continue;

		const slug = slugFromPath(path, prefix);
		docs.push({
			slug,
			href: slug ? `${hrefPrefix}/${slug}` : hrefPrefix,
			meta: {
				title: meta?.title ?? slug.split('/').pop() ?? '',
				description: meta?.description ?? '',
				order: meta?.order,
				sidebar: meta?.sidebar,
				lastUpdated: meta?.lastUpdated
			},
			component: mod.default
		});
	}

	return docs.sort((a, b) => (a.meta.order ?? 999) - (b.meta.order ?? 999));
}

export function getAllDocs(locale?: string): DocPage[] {
	const defaultLocale = docsConfig.i18n?.defaultLocale ?? 'en';

	if (!locale || locale === defaultLocale) {
		return buildDocs(contentModules, '/src/content/docs/', '/docs');
	}

	// Filter localized modules for the requested locale
	const prefix = `/src/content/docs-${locale}/`;
	const filtered: Record<string, DocFile> = {};
	for (const [path, mod] of Object.entries(localizedModules)) {
		if (path.startsWith(prefix)) {
			filtered[path] = mod;
		}
	}

	return buildDocs(filtered, prefix, `/docs/${locale}`);
}

export function getDoc(slug: string, locale?: string): DocPage | undefined {
	return getAllDocs(locale).find((doc) => doc.slug === slug);
}

export function getRawContent(slug: string): string {
	const path = slug
		? `/src/content/docs/${slug}.md`
		: '/src/content/docs/index.md';
	return rawModules[path] ?? '';
}

export function getDocsByDirectory(directory: string, locale?: string): DocPage[] {
	return getAllDocs(locale).filter(
		(doc) => doc.slug.startsWith(directory + '/') || doc.slug === directory
	);
}
