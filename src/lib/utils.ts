import { error } from "@sveltejs/kit";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { DocResolver } from "./types/docs";
import type { NavItem } from "./types/nav";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}


type Modules = Record<string, () => Promise<unknown>>;


export function slugFromPath(path: string) {
	return path.replace('/src/content/', '').replace('.md', '');
}

export async function getDoc(slug: string) {
	const modules = import.meta.glob(`/src/content/**/*.md`);
	const match = findMatch(slug, modules);
	const doc = await match?.resolver?.();

	if (!doc || !doc.metadata) {
		error(404);
	}

	return {
		component: doc.default,
		metadata: doc.metadata,
		title: doc.metadata.title
	};
}

function findMatch(slug: string, modules: Modules) {
	let match: { path?: string; resolver?: DocResolver } = {};

	for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === slug) {
			match = { path, resolver: resolver as unknown as DocResolver };
			break;
		}
	}
	if (!match.path) {
		match = getIndexDocIfExists(slug, modules);
	}

	return match;
}

export function slugFromPathname(pathname: string) {
	return pathname.split('/').pop() ?? '';
}

function getIndexDocIfExists(slug: string, modules: Modules) {
	let match: { path?: string; resolver?: DocResolver } = {};

	for (const [path, resolver] of Object.entries(modules)) {
		if (path.includes(`/${slug}/index.md`)) {
			match = { path, resolver: resolver as unknown as DocResolver };
			break;
		}
	}

	return match;
}
