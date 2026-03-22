<script lang="ts">
	import * as CardUI from '$lib/components/ui/card/index.js';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';

	let {
		title,
		description,
		href
	}: {
		title: string;
		description?: string;
		href: string;
	} = $props();
</script>

<a {href} class="not-prose no-underline">
	<CardUI.Root class="hover:border-foreground/20 hover:bg-accent group transition-colors">
		<CardUI.Header>
			<div class="flex items-center justify-between">
				<CardUI.Title>{title}</CardUI.Title>
				<ArrowRightIcon class="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
			</div>
			{#if description}
				<CardUI.Description>{description}</CardUI.Description>
			{/if}
		</CardUI.Header>
	</CardUI.Root>
</a>
