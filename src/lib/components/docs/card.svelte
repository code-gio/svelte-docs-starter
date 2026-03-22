<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as CardUI from '$lib/components/ui/card/index.js';

	let {
		title,
		icon,
		children
	}: {
		title: string;
		icon?: string;
		children: Snippet;
	} = $props();
</script>

<CardUI.Root class="not-prose">
	<CardUI.Header>
		<CardUI.Title class="flex items-center gap-2">
			{#if icon}
				<span class="text-xl leading-none">{icon}</span>
			{/if}
			{title}
		</CardUI.Title>
	</CardUI.Header>
	<CardUI.Content>
		<div class="text-muted-foreground text-sm">
			{@render children()}
		</div>
	</CardUI.Content>
</CardUI.Root>
