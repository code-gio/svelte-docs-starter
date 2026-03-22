import { getNavigation } from '$lib/docs/index.js';

export const prerender = true;

export function load() {
	const navigation = getNavigation();
	return { navigation };
}
