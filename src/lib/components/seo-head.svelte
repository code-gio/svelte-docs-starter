<script lang="ts">
	import { page } from '$app/state';
	import { docsConfig } from '$lib/docs/config.js';

	let {
		title,
		description
	}: {
		title: string;
		description?: string;
	} = $props();

	let siteTitle = docsConfig.site.title;
	let fullTitle = $derived(title === siteTitle ? title : `${title} — ${siteTitle}`);
	let url = $derived(docsConfig.site.url ? `${docsConfig.site.url}${page.url.pathname}` : page.url.pathname);

	let jsonLd = $derived(JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'TechArticle',
		headline: title,
		description: description ?? '',
		url,
		isPartOf: {
			'@type': 'WebSite',
			name: siteTitle,
			url: docsConfig.site.url ?? ''
		}
	}));
</script>

<svelte:head>
	<title>{fullTitle}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}

	<!-- OpenGraph -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content={fullTitle} />
	{#if description}
		<meta property="og:description" content={description} />
	{/if}
	<meta property="og:url" content={url} />
	{#if docsConfig.site.title}
		<meta property="og:site_name" content={docsConfig.site.title} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={fullTitle} />
	{#if description}
		<meta name="twitter:description" content={description} />
	{/if}

	<!-- Canonical -->
	<link rel="canonical" href={url} />

	<!-- Structured Data -->
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>
