<script lang="ts">
	import DocRenderer from '$lib/components/doc-renderer.svelte';
	import DocsFooter from '$lib/components/layout/docs-footer.svelte';
	import KeyboardNav from '$lib/components/nav/keyboard-nav.svelte';
	import SeoHead from '$lib/components/seo-head.svelte';
	import { getDoc } from '$lib/docs/index.js';

	let { data } = $props();
	let doc = $derived(getDoc(data.slug));
</script>

<SeoHead title={data.meta.title} description={data.meta.description} />

{#if doc}
	<DocRenderer meta={doc.meta} component={doc.component} slug={data.slug} rawContent={data.rawContent} />
{/if}
<DocsFooter prev={data.prev} next={data.next} />
<KeyboardNav prev={data.prev} next={data.next} />
