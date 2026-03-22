import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	// Only match 2-letter locale codes (e.g. "es", "fr", "de")
	return /^[a-z]{2}(-[a-z]{2})?$/.test(param);
};
