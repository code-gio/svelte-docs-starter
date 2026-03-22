# svelte-docs-starter — Build Plan

> Rebuild of the docs template with modern Svelte 5, Tailwind v4, and inspiration from Astro Starlight.

All phases complete.

---

## Phase 1: Content System — DONE

- [x] MDSvex with Shiki syntax highlighting (dual theme, line highlighting, file name headers)
- [x] Content directory (`src/content/docs/`) with nested categories
- [x] Content loader (`src/lib/docs/content.ts`) with glob imports and slug resolution
- [x] Dynamic `[...slug]` route with 404 handling
- [x] 6 sample content pages

## Phase 2: Navigation — DONE

- [x] Auto-generated sidebar from file structure (`src/lib/docs/navigation.ts`)
- [x] Declarative config (`src/lib/docs/config.ts`)
- [x] Sidebar with active page highlighting, collapsible sections, icons
- [x] Search command wired to real navigation data
- [x] Scoped sidebar (auto-expand active section only)

## Phase 3: Document Rendering — DONE

- [x] Shiki dual-theme syntax highlighting with `@shikijs/transformers`
- [x] Line highlighting (`{1,3-5}` syntax)
- [x] File name headers (`title="filename.ts"`)
- [x] Table of Contents with scroll spy (right sidebar + mobile collapsible)
- [x] Copy-to-clipboard on code blocks
- [x] Anchor links on headings (hover `#`)
- [x] Prose styling (Tailwind Typography, dark mode)

## Phase 4: Built-in Doc Components — DONE

All built on shadcn-svelte (`alert`, `tabs`, `card`, `badge`).

- [x] `<Callout>` — note, warning, tip, danger (shadcn Alert)
- [x] `<Tabs>` / `<TabItem>` — tabbed content (shadcn Tabs)
- [x] `<Steps>` — timeline-style numbered steps
- [x] `<Card>` / `<CardGrid>` — feature cards (shadcn Card)
- [x] `<LinkCard>` — navigation cards (shadcn Card)
- [x] `<Badge>` — status labels (shadcn Badge)
- [x] `<FileTree>` — directory tree with connector lines
- [x] `<CodeGroup>` — code blocks with language tabs (shadcn Tabs)

## Phase 5: Search — DONE

- [x] Pagefind build-time indexing (postbuild script)
- [x] Cmd+K command palette with Pagefind search (lazy load, debounced, excerpts)
- [x] Fallback to nav browsing in dev mode
- [x] All docs pages prerendered for indexing

## Phase 6: SEO & Performance — DONE

- [x] `<SeoHead>` component (OG, Twitter, canonical, JSON-LD)
- [x] Auto-generated sitemap (`/sitemap.xml`)
- [x] Prerendering on all docs pages
- [x] robots.txt configured

## Phase 7: Landing Page — DONE

- [x] Hero with gradient, CTA buttons
- [x] 8-feature grid with icons
- [x] 3-step getting started
- [x] Tech stack section (12 libraries)
- [x] CTA section + 4-column footer
- [x] Header nav with search, dark mode, GitHub

## Phase 8: Developer Experience — DONE

- [x] Prettier (svelte + tailwind plugins)
- [x] ESLint (svelte plugin)
- [x] `npm run format` / `npm run lint` scripts

## Phase 9: Polish & Extras — DONE

- [x] Edit on GitHub link (auto-generated from slug + config)
- [x] Last updated date (from frontmatter `lastUpdated` field)
- [x] Print styles (hide sidebars/nav, full-width content, expand URLs)
- [x] Skip-to-content link (accessible keyboard navigation)
- [x] `aria-label` on sidebar navigation
- [x] Cleaned up unused imports
- [ ] Version selector — optional (not needed for v1)
- [ ] i18n support — optional (future enhancement)
- [ ] RSS feed — optional (future enhancement)
