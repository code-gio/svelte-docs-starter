---
title: Escribir Contenido
description: Cómo escribir y organizar el contenido de la documentación.
order: 2
---

## Crear Páginas

Crea un nuevo archivo `.md` en `src/content/docs/` para agregar una página. La ruta del archivo determina la URL:

| Ruta del Archivo | URL |
|------------------|-----|
| `docs/index.md` | `/docs` |
| `docs/getting-started/installation.md` | `/docs/getting-started/installation` |
| `docs/guides/configuration.md` | `/docs/guides/configuration` |

## Características de Markdown

### Markdown Estándar

Toda la sintaxis estándar de Markdown es soportada — encabezados, listas, enlaces, imágenes, tablas, citas y más.

### Bloques de Código

Los bloques de código cercados obtienen resaltado de sintaxis via Shiki:

```javascript
function saludar(nombre) {
  return `¡Hola, ${nombre}!`;
}
```

```svelte
<script>
  let contador = $state(0);
</script>

<button onclick={() => contador++}>
  Clics: {contador}
</button>
```

### Componentes Svelte en Markdown

Como esto usa MDSvex, puedes importar y usar componentes Svelte directamente en tus archivos `.md`:

```svelte
<script>
  import MiComponente from '$lib/components/mi-componente.svelte';
</script>

<MiComponente />
```

## Organizar el Contenido

### Estructura de Directorios

Agrupa páginas relacionadas en directorios. Cada directorio se convierte en una sección del sidebar cuando se configura en `docs.config.ts`.

### Ordenar Páginas

Usa el campo `order` en el frontmatter para controlar el orden de las páginas en el sidebar:

```yaml
---
title: Primera Página
order: 1
---
```

Las páginas sin un valor `order` aparecen después de las páginas ordenadas, clasificadas alfabéticamente.
