import type { DocFile, DocMeta, DocPage } from './types.js';

const contentModules = import.meta.glob<DocFile>('/src/content/docs/**/*.{md,svx}', {
	eager: true
});

function slugFromPath(path: string): string {
	return path
		.replace('/src/content/docs/', '')
		.replace(/\.(md|svx)$/, '')
		.replace(/(?:^|\/)index$/, '');
}

export function getAllDocs(): DocPage[] {
	const docs: DocPage[] = [];

	for (const [path, mod] of Object.entries(contentModules)) {
		const meta = mod.metadata as DocMeta;
		if (meta?.draft) continue;

		const slug = slugFromPath(path);
		docs.push({
			slug,
			href: slug ? `/docs/${slug}` : '/docs',
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

export function getDoc(slug: string): DocPage | undefined {
	return getAllDocs().find((doc) => doc.slug === slug);
}

export function getDocsByDirectory(directory: string): DocPage[] {
	return getAllDocs().filter(
		(doc) => doc.slug.startsWith(directory + '/') || doc.slug === directory
	);
}
