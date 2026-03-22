---
title: Built-in Components
description: Documentation components you can use directly in your markdown files.
order: 3
---

<script>
import { Callout, Tabs, TabItem, Steps, Card, CardGrid, LinkCard, Badge, FileTree } from '$lib/components/docs/index.js';
</script>

## Callouts

Use callouts to highlight important information.

<Callout type="note">
This is a note callout. Use it for general information the reader should be aware of.
</Callout>

<Callout type="tip">
This is a tip callout. Use it for helpful suggestions and best practices.
</Callout>

<Callout type="warning">
This is a warning callout. Use it for potential issues or things to watch out for.
</Callout>

<Callout type="danger">
This is a danger callout. Use it for critical warnings about destructive or irreversible actions.
</Callout>

You can also customize the title:

<Callout type="note" title="Custom Title">
Callouts support custom titles via the `title` prop.
</Callout>

## Tabs

Use tabs to show alternative content, like different package managers:

<Tabs items={["npm", "pnpm", "yarn"]}>
<TabItem label="npm">

```bash
npm install svelte-docs-starter
```

</TabItem>
<TabItem label="pnpm">

```bash
pnpm add svelte-docs-starter
```

</TabItem>
<TabItem label="yarn">

```bash
yarn add svelte-docs-starter
```

</TabItem>
</Tabs>

## Steps

Use steps for sequential instructions:

<Steps>

### Create a new project

Clone the template repository and install dependencies.

### Configure your site

Edit `src/lib/docs/config.ts` with your site details.

### Write your content

Add markdown files to `src/content/docs/`.

### Deploy

Build and deploy to your hosting provider.

</Steps>

## Cards

Use cards to highlight features or key information:

<CardGrid>
<Card title="Markdown Powered" icon="📝">
Write documentation in Markdown with full MDSvex support for Svelte components.
</Card>
<Card title="Fast Search" icon="🔍">
Built-in full-text search powered by Pagefind with zero JavaScript overhead.
</Card>
<Card title="Dark Mode" icon="🌙">
Automatic light and dark theme support with system preference detection.
</Card>
<Card title="SEO Ready" icon="📈">
OpenGraph, Twitter cards, JSON-LD structured data, and auto-generated sitemap.
</Card>
</CardGrid>

## Link Cards

Use link cards for navigation:

<CardGrid>
<LinkCard title="Installation" description="Get started with the template" href="/docs/getting-started/installation" />
<LinkCard title="Configuration" description="Customize your docs site" href="/docs/guides/configuration" />
</CardGrid>

## Badges

Use badges to indicate status: <Badge text="New" variant="new" /> <Badge text="Experimental" variant="experimental" /> <Badge text="Deprecated" variant="deprecated" /> <Badge text="v1.0.0" />

## File Tree

Display directory structures:

<FileTree>

- src/
  - content/
    - docs/
      - index.md
      - getting-started/
        - installation.md
      - guides/
        - configuration.md
  - lib/
    - components/
      - docs/
        - callout.svelte
        - tabs.svelte
    - docs/
      - config.ts
      - content.ts

</FileTree>
