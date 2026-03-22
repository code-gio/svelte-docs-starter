---
title: Configuration
description: How to configure your documentation site.
order: 1
---

## Site Configuration

Edit `src/lib/docs/config.ts` to customize your site:

```typescript
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
      autogenerate: { directory: 'getting-started' }
    },
    {
      label: 'Guides',
      autogenerate: { directory: 'guides' }
    }
  ],
  toc: {
    minDepth: 2,
    maxDepth: 3
  }
};
```

## Sidebar Configuration

### Auto-generated Sections

Use `autogenerate` to build sidebar sections from a directory:

```typescript
{
  label: 'Getting Started',
  autogenerate: { directory: 'getting-started' }
}
```

This will scan `src/content/docs/getting-started/` and create nav items for each `.md` file.

### Manual Sections

You can also define items manually:

```typescript
{
  label: 'Resources',
  items: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Discord', href: 'https://discord.gg/example' }
  ]
}
```

## Frontmatter Options

Each markdown file supports these frontmatter fields:

```yaml
---
title: Page Title        # Required — displayed as the page heading
description: A summary   # Optional — shown below the title and in meta tags
order: 1                 # Optional — controls sidebar ordering (lower = higher)
draft: true              # Optional — hides the page from navigation
sidebar:
  label: Custom Label    # Optional — overrides the title in the sidebar
---
```
