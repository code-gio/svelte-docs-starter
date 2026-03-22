---
title: Componentes Integrados
description: Componentes de documentación que puedes usar directamente en tus archivos markdown.
order: 3
---

<script>
import { Callout, Tabs, TabItem, Steps, Card, CardGrid, LinkCard, Badge, FileTree } from '$lib/components/docs/index.js';
</script>

## Callouts

Usa callouts para resaltar información importante.

<Callout type="note">
Este es un callout de nota. Úsalo para información general que el lector debe conocer.
</Callout>

<Callout type="tip">
Este es un callout de consejo. Úsalo para sugerencias útiles y mejores prácticas.
</Callout>

<Callout type="warning">
Este es un callout de advertencia. Úsalo para posibles problemas o cosas a tener en cuenta.
</Callout>

<Callout type="danger">
Este es un callout de peligro. Úsalo para advertencias críticas sobre acciones destructivas o irreversibles.
</Callout>

## Tabs

Usa tabs para mostrar contenido alternativo, como diferentes gestores de paquetes:

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

Usa steps para instrucciones secuenciales:

<Steps>

### Crear un nuevo proyecto

Clona el repositorio de la plantilla e instala las dependencias.

### Configurar tu sitio

Edita `src/lib/docs/config.ts` con los detalles de tu sitio.

### Escribe tu contenido

Agrega archivos markdown a `src/content/docs/`.

### Desplegar

Compila y despliega en tu proveedor de hosting.

</Steps>

## Cards

Usa cards para resaltar características o información clave:

<CardGrid>
<Card title="Impulsado por Markdown" icon="📝">
Escribe documentación en Markdown con soporte completo de MDSvex para componentes Svelte.
</Card>
<Card title="Búsqueda Rápida" icon="🔍">
Búsqueda de texto completo integrada impulsada por Pagefind sin sobrecarga de JavaScript.
</Card>
<Card title="Modo Oscuro" icon="🌙">
Soporte automático de temas claro y oscuro con detección de preferencias del sistema.
</Card>
<Card title="Listo para SEO" icon="📈">
OpenGraph, Twitter cards, datos estructurados JSON-LD y sitemap auto-generado.
</Card>
</CardGrid>

## Link Cards

Usa link cards para navegación:

<CardGrid>
<LinkCard title="Instalación" description="Comienza con la plantilla" href="/docs/es/getting-started/installation" />
<LinkCard title="Configuración" description="Personaliza tu sitio de docs" href="/docs/es/guides/configuration" />
</CardGrid>

## Badges

Usa badges para indicar estado: <Badge text="Nuevo" variant="new" /> <Badge text="Experimental" variant="experimental" /> <Badge text="Obsoleto" variant="deprecated" /> <Badge text="v1.0.0" />

## File Tree

Muestra estructuras de directorios:

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
