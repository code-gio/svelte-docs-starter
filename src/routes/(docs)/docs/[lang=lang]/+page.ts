import { docsConfig, getDoc } from '$lib/docs/index.js';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types.js';

export function entries() {
	const locales = docsConfig.i18n?.locales ?? [];
	const defaultLocale = docsConfig.i18n?.defaultLocale ?? 'en';
	return locales.filter((l) => l.code !== defaultLocale).map((l) => ({ lang: l.code }));
}

export const load: PageLoad = ({ params }) => {
	const doc = getDoc('', params.lang);
	if (!doc) throw error(404, 'Documentation index not found');

	return {
		meta: doc.meta,
		slug: '',
		locale: params.lang
	};
};
