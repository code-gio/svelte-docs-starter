---
title: Writing Content
description: How to write and organize documentation content.
order: 2
---

## Creating Pages

Create a new `.md` file in `src/content/docs/` to add a page. The file path determines the URL:

| File Path | URL |
|-----------|-----|
| `docs/index.md` | `/docs` |
| `docs/getting-started/installation.md` | `/docs/getting-started/installation` |
| `docs/guides/configuration.md` | `/docs/guides/configuration` |

## Markdown Features

### Standard Markdown

All standard Markdown syntax is supported — headings, lists, links, images, tables, blockquotes, and more.

### Code Blocks

Fenced code blocks get syntax highlighting via Shiki:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

```svelte
<script>
  let count = $state(0);
</script>

<button onclick={() => count++}>
  Clicks: {count}
</button>
```

### Svelte Components in Markdown

Since this uses MDSvex, you can import and use Svelte components directly in your `.md` files:

```svelte
<script>
  import MyComponent from '$lib/components/my-component.svelte';
</script>

<MyComponent />
```

## Organizing Content

### Directory Structure

Group related pages in directories. Each directory becomes a sidebar section when configured in `docs.config.ts`.

### Ordering Pages

Use the `order` frontmatter field to control the order of pages in the sidebar:

```yaml
---
title: First Page
order: 1
---
```

Pages without an `order` value appear after ordered pages, sorted alphabetically.
