<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as TabsUI from '$lib/components/ui/tabs/index.js';

	let {
		items,
		children
	}: {
		items: string[];
		children: Snippet;
	} = $props();

	let el: HTMLDivElement | undefined = $state();

	$effect(() => {
		if (!el || items.length === 0) return;
		// Hide all code blocks except the first
		const blocks = el.querySelectorAll<HTMLElement>(':scope > [data-code-tab]');
		blocks.forEach((block, i) => {
			block.style.display = i === 0 ? '' : 'none';
		});
	});

	function switchTab(label: string) {
		if (!el) return;
		const blocks = el.querySelectorAll<HTMLElement>(':scope > [data-code-tab]');
		blocks.forEach((block) => {
			block.style.display = block.dataset.codeTab === label ? '' : 'none';
		});
	}
</script>

<div class="not-prose my-6">
	<TabsUI.Root value={items[0]} onValueChange={switchTab}>
		<TabsUI.List>
			{#each items as item (item)}
				<TabsUI.Trigger value={item}>{item}</TabsUI.Trigger>
			{/each}
		</TabsUI.List>
	</TabsUI.Root>
	<div bind:this={el} class="[&>div]:mt-0 [&_.shiki]:rounded-t-none [&_.code-block-titled]:mt-0 [&_.code-block-titled_.shiki]:rounded-t-none">
		{@render children()}
	</div>
</div>
