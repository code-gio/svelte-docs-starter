---
title: Project Structure
description: Understanding the project layout and key files.
order: 2
---

## Overview

The template follows SvelteKit conventions with a dedicated docs engine in `src/lib/docs/`.

## Key Directories

### `src/content/docs/`

This is where your documentation lives. Each `.md` file becomes a page. The directory structure determines the sidebar navigation.

```
src/content/docs/
├── index.md                    # /docs
├── getting-started/
│   ├── installation.md         # /docs/getting-started/installation
│   └── project-structure.md    # /docs/getting-started/project-structure
└── guides/
    ├── configuration.md        # /docs/guides/configuration
    └── writing-content.md      # /docs/guides/writing-content
```

### `src/lib/docs/`

The documentation engine:

- **`config.ts`** — Site configuration (title, sidebar sections, social links)
- **`content.ts`** — Content loader that discovers and parses markdown files
- **`navigation.ts`** — Generates sidebar navigation from the file structure
- **`types.ts`** — TypeScript types for docs, navigation, and config
- **`toc.svelte.ts`** — Table of contents state management

### `src/lib/components/`

- **`layout/`** — Layout components (header, sidebars)
- **`nav/`** — Navigation components (breadcrumbs)
- **`search/`** — Search command palette
- **`theme/`** — Dark mode toggle
- **`ui/`** — Base UI component library (shadcn-svelte)

## Configuration Files

| File | Purpose |
|------|---------|
| `svelte.config.js` | SvelteKit + MDSvex configuration |
| `vite.config.ts` | Vite + Tailwind CSS setup |
| `src/lib/docs/config.ts` | Docs site configuration |
| `components.json` | shadcn-svelte configuration |
