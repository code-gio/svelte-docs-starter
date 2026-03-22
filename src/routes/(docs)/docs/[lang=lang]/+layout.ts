import { docsConfig, getNavigation } from '$lib/docs/index.js';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types.js';

export const prerender = true;

export const load: LayoutLoad = ({ params }) => {
	const locale = params.lang;
	const validLocales = docsConfig.i18n?.locales.map((l) => l.code) ?? [];

	if (!validLocales.includes(locale)) {
		throw error(404, `Unknown locale: ${locale}`);
	}

	const navigation = getNavigation(locale);
	return { navigation, locale };
};
