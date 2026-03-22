# Svelte Docs Starter

A modern, full-featured documentation starter built with **SvelteKit**, **Tailwind CSS v4**, **shadcn-svelte**, and **MDSvex**. Inspired by Astro Starlight.

## Features

- **Markdown-powered** — Write docs in Markdown with full Svelte component support via MDSvex
- **Auto-generated sidebar** — Navigation built automatically from your file structure
- **Full-text search** — Pagefind-powered search with Cmd+K command palette
- **Syntax highlighting** — Shiki with dual light/dark themes, line highlighting, and file name headers
- **Dark mode** — Light/dark toggle with system preference detection (mode-watcher)
- **Table of Contents** — Auto-extracted from headings with scroll spy and progress indicator
- **i18n support** — Locale-based routing with language switcher
- **Version selector** — Optional version dropdown in the sidebar (see [Versioning guide](/docs/guides/versioning))
- **SEO ready** — OpenGraph, Twitter cards, canonical URLs, JSON-LD structured data, sitemap, and RSS feed
- **9 built-in components** — Callout, Tabs, Steps, Card, CardGrid, LinkCard, Badge, FileTree, CodeGroup
- **Reading time** — Auto-calculated from content word count
- **Keyboard navigation** — Arrow keys to navigate between pages
- **Image zoom** — Click to expand images in docs
- **Page feedback** — "Was this helpful?" widget
- **Copy buttons** — Copy code blocks and page URLs
- **Edit on GitHub** — Auto-generated links from your config
- **Print styles** — Clean print output with expanded links
- **LLM-friendly** — Auto-generated `/llms.txt` and `/llms-full.txt`
- **Landing page** — Ready-to-customize home page with hero, features, and footer

## Quick Start

```bash
npx degit code-gio/svelte-docs-starter my-docs
cd my-docs
npm install
npm run dev
```

Or clone with git:

```bash
git clone https://github.com/code-gio/svelte-docs-starter.git my-docs
cd my-docs
rm -rf .git && git init
npm install
npm run dev
```

To remove demo content and start fresh:

```bash
npm run clean
```

## Project Structure

```
src/
├── content/
│   ├── docs/                    # Your documentation (Markdown)
│   │   ├── index.md             # Docs home (/docs)
│   │   ├── getting-started/     # Category folder
│   │   │   └── installation.md
│   │   └── guides/
│   │       └── configuration.md
│   └── docs-es/                 # Translations (optional)
│
├── lib/
│   ├── docs/                    # Documentation engine
│   │   ├── config.ts            # Site config, sidebar, i18n
│   │   ├── types.ts             # Type definitions
│   │   ├── content.ts           # Content loader
│   │   ├── navigation.ts        # Auto-generate sidebar nav
│   │   └── reading-time.ts      # Word count calculation
│   │
│   └── components/
│       ├── docs/                # Built-in doc components
│       ├── layout/              # Header, sidebars, footer
│       ├── nav/                 # Breadcrumb, keyboard nav, social links
│       ├── search/              # Command palette search
│       ├── theme/               # Dark mode switcher
│       └── ui/                  # shadcn-svelte primitives
│
└── routes/
    ├── +page.svelte             # Landing page
    ├── +error.svelte            # 404 page
    └── (docs)/docs/             # Documentation routes
```

## Configuration

Edit `src/lib/docs/config.ts` to customize your site:

```typescript
import RocketIcon from '@lucide/svelte/icons/rocket';
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
  // Optional: enable version selector
  // versions: {
  //   current: 'v1.0.0',
  //   versions: [
  //     { label: 'v1.0.0 (latest)', href: '/docs' }
  //   ]
  // }
};
```

## Writing Content

Create Markdown files in `src/content/docs/`:

```markdown
---
title: Page Title
description: Short description for SEO
order: 1
lastUpdated: 2026-03-22
---

## Your Content

Write Markdown here. You can use Svelte components too.
```

### Frontmatter Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Page title (required) |
| `description` | `string` | SEO description |
| `order` | `number` | Sort order in sidebar (default: 999) |
| `sidebar.label` | `string` | Override title in sidebar |
| `draft` | `boolean` | Skip this page if true |
| `lastUpdated` | `string` | Date shown in page footer |

### Built-in Components

Use these components directly in your Markdown files:

```markdown
<script>
  import { Callout, Tabs, TabItem, Steps, Card, CardGrid,
           LinkCard, Badge, FileTree, CodeGroup } from '$lib/components/docs';
</script>

<Callout type="tip" title="Pro Tip">
  This is a tip callout.
</Callout>

<Tabs items={["npm", "pnpm"]}>
  <TabItem label="npm">npm install my-package</TabItem>
  <TabItem label="pnpm">pnpm add my-package</TabItem>
</Tabs>

<Badge text="New" variant="new" />

<FileTree>
  - src/
    - lib/
    - routes/
  - package.json
</FileTree>
```

**Callout types:** `note`, `tip`, `warning`, `danger`

**Badge variants:** `default`, `new`, `deprecated`, `experimental`

### Syntax Highlighting

Code blocks support line highlighting and file names:

````markdown
```typescript title="src/example.ts" {1,3-5}
const highlighted = true;
const normal = false;
const alsoHighlighted = true;
```
````

## i18n

Add translations by creating locale-specific content directories:

1. Configure locales in `config.ts`:

```typescript
i18n: {
  defaultLocale: 'en',
  locales: [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' }
  ]
}
```

2. Create translated content in `src/content/docs-es/` mirroring the same file structure as `src/content/docs/`.

Routes are automatically generated: `/docs/es/getting-started/installation`

## Search

Search is powered by [Pagefind](https://pagefind.app) and runs automatically after build:

```bash
npm run build  # Builds site + generates search index
```

In development, the command palette falls back to browsing the navigation tree.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (includes search indexing) |
| `npm run preview` | Preview production build |
| `npm run check` | Type-check the project |
| `npm run format` | Format code with Prettier |
| `npm run lint` | Run ESLint + Prettier checks |
| `npm run clean` | Remove demo content and start fresh |

## Deployment

SvelteKit supports deployment to any platform. Install the appropriate [adapter](https://svelte.dev/docs/kit/adapters):

```bash
# Vercel
npm i -D @sveltejs/adapter-vercel

# Netlify
npm i -D @sveltejs/adapter-netlify

# Cloudflare Pages
npm i -D @sveltejs/adapter-cloudflare

# Static site
npm i -D @sveltejs/adapter-static
```

Update the adapter import in `svelte.config.js`.

## Tech Stack

| Library | Purpose |
|---------|---------|
| [SvelteKit](https://svelte.dev/docs/kit) | Full-stack framework |
| [Svelte 5](https://svelte.dev) | Reactive UI with runes |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first CSS |
| [shadcn-svelte](https://shadcn-svelte.com) | Accessible UI components |
| [MDSvex](https://mdsvex.pngwn.io) | Markdown + Svelte |
| [Shiki](https://shiki.style) | Syntax highlighting |
| [Pagefind](https://pagefind.app) | Static search |
| [mode-watcher](https://github.com/svecosystem/mode-watcher) | Dark mode |
| [Lucide](https://lucide.dev) | Icon library |
| [bits-ui](https://bits-ui.com) | Headless components |

## License

MIT
