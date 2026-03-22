import { getDoc, getPrevNext, getRawContent } from '$lib/docs/index.js';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types.js';

export const load: PageLoad = ({ params }) => {
	const doc = getDoc(params.slug);
	if (!doc) throw error(404, `Page not found: ${params.slug}`);

	const { prev, next } = getPrevNext(params.slug);

	return {
		meta: doc.meta,
		slug: params.slug,
		prev,
		next,
		rawContent: getRawContent(params.slug)
	};
};
