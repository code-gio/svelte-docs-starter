---
title: Versionado
description: Cómo agregar un selector de versiones a tu sitio de documentación.
order: 4
---

## Resumen

La plantilla incluye un selector de versiones opcional que aparece en el encabezado del sidebar. Enlaza entre diferentes despliegues de tu documentación — un sitio por versión.

Este **no** es un sistema de versionado estilo Docusaurus que mantiene múltiples copias del contenido en el mismo repositorio. En su lugar, cada versión es un despliegue separado, y el dropdown simplemente navega entre ellos.

## Activar el Selector de Versiones

Agrega la configuración `versions` en `src/lib/docs/config.ts`:

```typescript
export const docsConfig: DocsConfig = {
  // ...tu configuración existente
  versions: {
    current: 'v2.0.0',
    versions: [
      { label: 'v2.0.0 (última)', href: '/docs' },
      { label: 'v1.x', href: 'https://v1.tu-sitio.com/docs' },
      { label: 'v0.x', href: 'https://v0.tu-sitio.com/docs' }
    ]
  }
};
```

Una vez agregado, aparecerá un dropdown en el encabezado del sidebar mostrando la versión actual.

## Cómo Funciona

- **`current`** — La etiqueta de versión mostrada en el encabezado del sidebar
- **`versions`** — Array de versiones, cada una con `label` y `href`
- **Enlaces internos** (como `/docs`) navegan dentro del mismo sitio
- **Enlaces externos** (como `https://v1.tu-sitio.com/docs`) se abren en una nueva pestaña

## Flujo de Trabajo Recomendado

1. **Rama principal** → despliega en tu dominio principal (última versión)
2. **Ramas de versión** (ej. `v1.x`) → despliegan en subdominios o URLs separadas
3. Cada despliegue tiene su propia configuración `versions` apuntando a todas las demás versiones

## Desactivar

Para remover el selector de versiones, simplemente elimina o comenta la clave `versions` en tu configuración.
