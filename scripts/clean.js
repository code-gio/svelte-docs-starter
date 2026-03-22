import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve(import.meta.dirname, '..');
const contentDocsDir = path.join(rootDir, 'src', 'content', 'docs');
const contentDocsEsDir = path.join(rootDir, 'src', 'content', 'docs-es');
const pagefindDir = path.join(rootDir, 'static', 'pagefind');
const configFile = path.join(rootDir, 'src', 'lib', 'docs', 'config.ts');

const cleaned = [];

// 1. Clean markdown files in src/content/docs/ but preserve directory structure
if (fs.existsSync(contentDocsDir)) {
	function removeMarkdownFiles(dir) {
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				// Recurse into subdirectories
				removeMarkdownFiles(fullPath);
				// Remove the subdirectory if it's now empty
				const remaining = fs.readdirSync(fullPath);
				if (remaining.length === 0) {
					fs.rmSync(fullPath, { recursive: true, force: true });
				}
			} else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
				fs.unlinkSync(fullPath);
			}
		}
	}
	removeMarkdownFiles(contentDocsDir);
	cleaned.push('Removed all markdown files from src/content/docs/');

	// Recreate getting-started directory
	const gettingStartedDir = path.join(contentDocsDir, 'getting-started');
	fs.mkdirSync(gettingStartedDir, { recursive: true });

	// Create minimal index.md
	const indexContent = `---
title: "Documentation"
description: "Welcome to the docs."
order: 0
---

## Welcome

Start writing your documentation here.
`;
	fs.writeFileSync(path.join(contentDocsDir, 'index.md'), indexContent);
	cleaned.push('Created minimal src/content/docs/index.md');

	// 5. Create getting-started/installation.md
	const installationContent = `---
title: "Installation"
description: "How to install and set up."
order: 1
---

## Prerequisites

Add your prerequisites here.

## Installation

Add installation steps here.
`;
	fs.writeFileSync(path.join(gettingStartedDir, 'installation.md'), installationContent);
	cleaned.push('Created src/content/docs/getting-started/installation.md');
}

// 2. Delete src/content/docs-es/ directory
if (fs.existsSync(contentDocsEsDir)) {
	fs.rmSync(contentDocsEsDir, { recursive: true, force: true });
	cleaned.push('Removed src/content/docs-es/ (i18n demo content)');
} else {
	cleaned.push('src/content/docs-es/ not found, skipping');
}

// 3. Delete static/pagefind/ directory
if (fs.existsSync(pagefindDir)) {
	fs.rmSync(pagefindDir, { recursive: true, force: true });
	cleaned.push('Removed static/pagefind/ (regenerated on build)');
} else {
	cleaned.push('static/pagefind/ not found, skipping');
}

// 4. Reset src/lib/docs/config.ts
const cleanConfig = `import RocketIcon from '@lucide/svelte/icons/rocket';
import type { DocsConfig } from './types.js';

export const docsConfig: DocsConfig = {
	site: {
		title: 'My Docs',
		description: 'Documentation for my project.',
		social: {
			github: 'https://github.com/your-org/your-repo'
		}
	},
	sidebar: [
		{
			label: 'Getting Started',
			icon: RocketIcon,
			autogenerate: { directory: 'getting-started' }
		}
	],
	toc: {
		minDepth: 2,
		maxDepth: 3
	}
	// Uncomment to enable version selector:
	// versions: {
	// 	current: 'v1.0.0',
	// 	versions: [
	// 		{ label: 'v1.0.0 (latest)', href: '/docs' }
	// 	]
	// }
};
`;
fs.writeFileSync(configFile, cleanConfig);
cleaned.push('Reset src/lib/docs/config.ts to clean defaults');

// 6. Print summary
console.log('\n--- Clean complete ---\n');
for (const item of cleaned) {
	console.log(`  - ${item}`);
}
console.log('');
