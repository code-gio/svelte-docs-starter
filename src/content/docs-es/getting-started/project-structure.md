---
title: Estructura del Proyecto
description: Entendiendo la organización del proyecto y los archivos clave.
order: 2
---

## Vista General

La plantilla sigue las convenciones de SvelteKit con un motor de documentación dedicado en `src/lib/docs/`.

## Directorios Clave

### `src/content/docs/`

Aquí es donde vive tu documentación. Cada archivo `.md` se convierte en una página. La estructura de directorios determina la navegación del sidebar.

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

El motor de documentación:

- **`config.ts`** — Configuración del sitio (título, secciones del sidebar, enlaces sociales)
- **`content.ts`** — Cargador de contenido que descubre y analiza archivos markdown
- **`navigation.ts`** — Genera la navegación del sidebar desde la estructura de archivos
- **`types.ts`** — Tipos TypeScript para docs, navegación y configuración
- **`toc.svelte.ts`** — Gestión del estado de la tabla de contenidos

### `src/lib/components/`

- **`layout/`** — Componentes de diseño (header, sidebars)
- **`nav/`** — Componentes de navegación (breadcrumbs)
- **`search/`** — Paleta de búsqueda
- **`theme/`** — Cambio de modo oscuro
- **`docs/`** — Componentes de documentación (Callout, Tabs, Steps, etc.)
- **`ui/`** — Biblioteca de componentes base (shadcn-svelte)

## Archivos de Configuración

| Archivo | Propósito |
|---------|-----------|
| `svelte.config.js` | Configuración de SvelteKit + MDSvex |
| `vite.config.ts` | Configuración de Vite + Tailwind CSS |
| `src/lib/docs/config.ts` | Configuración del sitio de documentación |
| `components.json` | Configuración de shadcn-svelte |
