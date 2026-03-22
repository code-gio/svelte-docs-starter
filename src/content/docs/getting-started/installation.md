---
title: Installation
description: How to install and set up the documentation starter.
order: 1
lastUpdated: 2026-03-22
---

## Prerequisites

Make sure you have the following installed:

- **Node.js** 18 or later
- **npm**, **pnpm**, or **yarn**

## Create a New Project

Clone the template and install dependencies:

```bash
npx degit codegio/svelte-docs-starter my-docs
cd my-docs
npm install
```

## Start the Dev Server

```bash
npm run dev
```

Your docs site will be running at `http://localhost:5173`.

## Project Structure

After installation, your project will look like this:

```
my-docs/
├── src/
│   ├── content/docs/     # Your markdown files
│   ├── lib/
│   │   ├── components/   # UI components
│   │   └── docs/         # Docs engine (config, content loader, nav)
│   └── routes/           # SvelteKit routes
├── svelte.config.js
├── vite.config.ts
└── package.json
```

## Next Steps

- [Project Structure](/docs/getting-started/project-structure) — Learn how the template is organized
- [Configuration](/docs/guides/configuration) — Customize your docs site
- [Writing Content](/docs/guides/writing-content) — Learn how to write documentation
