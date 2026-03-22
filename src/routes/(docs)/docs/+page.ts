import { getDoc } from '$lib/docs/index.js';
import { error } from '@sveltejs/kit';

export function load() {
	const doc = getDoc('');
	if (!doc) throw error(404, 'Documentation index not found');

	return {
		meta: doc.meta,
		slug: ''
	};
}
