<script lang="ts">
	import DocRenderer from '$lib/components/doc-renderer.svelte';
	import DocsFooter from '$lib/components/layout/docs-footer.svelte';
	import SeoHead from '$lib/components/seo-head.svelte';
	import { getDoc } from '$lib/docs/index.js';

	let { data } = $props();
	let doc = $derived(getDoc(data.slug));
</script>

<SeoHead title={data.meta.title} description={data.meta.description} />

{#if doc}
	<DocRenderer meta={doc.meta} component={doc.component} slug={data.slug} />
{/if}
<DocsFooter />
