<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as TabsUI from '$lib/components/ui/tabs/index.js';

	let {
		items,
		children
	}: {
		items: string[];
		children: Snippet<[string]>;
	} = $props();
</script>

<div class="not-prose my-6">
	<TabsUI.Root value={items[0]}>
		<TabsUI.List>
			{#each items as item (item)}
				<TabsUI.Trigger value={item}>{item}</TabsUI.Trigger>
			{/each}
		</TabsUI.List>
		{@render children(items[0])}
	</TabsUI.Root>
</div>
