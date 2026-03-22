---
title: Configuración
description: Cómo configurar tu sitio de documentación.
order: 1
---

## Configuración del Sitio

Edita `src/lib/docs/config.ts` para personalizar tu sitio:

```typescript
import type { DocsConfig } from './types.js';

export const docsConfig: DocsConfig = {
  site: {
    title: 'Mis Docs',
    description: 'Documentación para mi proyecto.',
    social: {
      github: 'https://github.com/tu-org/tu-repo'
    }
  },
  sidebar: [
    {
      label: 'Inicio Rápido',
      autogenerate: { directory: 'getting-started' }
    },
    {
      label: 'Guías',
      autogenerate: { directory: 'guides' }
    }
  ],
  toc: {
    minDepth: 2,
    maxDepth: 3
  }
};
```

## Configuración del Sidebar

### Secciones Auto-generadas

Usa `autogenerate` para construir secciones del sidebar desde un directorio:

```typescript
{
  label: 'Inicio Rápido',
  autogenerate: { directory: 'getting-started' }
}
```

Esto escaneará `src/content/docs/getting-started/` y creará elementos de navegación para cada archivo `.md`.

### Secciones Manuales

También puedes definir elementos manualmente:

```typescript
{
  label: 'Recursos',
  items: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Discord', href: 'https://discord.gg/ejemplo' }
  ]
}
```

## Opciones de Frontmatter

Cada archivo markdown soporta estos campos de frontmatter:

```yaml
---
title: Título de la Página       # Requerido
description: Un resumen           # Opcional — se muestra debajo del título
order: 1                          # Opcional — controla el orden en el sidebar
draft: true                       # Opcional — oculta la página de la navegación
lastUpdated: 2026-03-22           # Opcional — fecha de última actualización
sidebar:
  label: Etiqueta Personalizada   # Opcional — sobreescribe el título en el sidebar
---
```
