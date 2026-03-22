---
title: Versioning
description: How to add a version selector to your documentation site.
order: 4
---

## Overview

The template includes an optional version selector dropdown that appears in the sidebar header. It links between different deployments of your docs — one site per version.

This is **not** a Docusaurus-style versioning system that maintains multiple content copies in the same repo. Instead, each version is a separate deployment, and the dropdown simply navigates between them.

## Enabling the Version Selector

Add the `versions` config to `src/lib/docs/config.ts`:

```typescript
export const docsConfig: DocsConfig = {
  // ...your existing config
  versions: {
    current: 'v2.0.0',
    versions: [
      { label: 'v2.0.0 (latest)', href: '/docs' },
      { label: 'v1.x', href: 'https://v1.your-site.com/docs' },
      { label: 'v0.x', href: 'https://v0.your-site.com/docs' }
    ]
  }
};
```

Once added, a dropdown will appear in the sidebar header showing the current version with a chevron. Clicking it reveals all available versions.

## How It Works

- **`current`** — The version label displayed in the sidebar header
- **`versions`** — Array of version entries, each with a `label` and `href`
- **Internal links** (like `/docs`) navigate within the same site
- **External links** (like `https://v1.your-site.com/docs`) open in a new tab

## Recommended Workflow

1. **Main branch** → deploys to your primary domain (latest version)
2. **Version branches** (e.g. `v1.x`) → deploy to subdomains or separate URLs
3. Each deployment has its own `versions` config pointing to all other versions

For example with Vercel or Netlify, you can set up branch deploys:

| Branch | URL | Version |
|--------|-----|---------|
| `main` | `docs.your-site.com` | v2.0.0 (latest) |
| `v1.x` | `v1.docs.your-site.com` | v1.x |
| `v0.x` | `v0.docs.your-site.com` | v0.x |

## Disabling

To remove the version selector, simply remove or comment out the `versions` key in your config. The sidebar header will show just the site title without a dropdown.
