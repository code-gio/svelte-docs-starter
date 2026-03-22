<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as TabsUI from '$lib/components/ui/tabs/index.js';

	let {
		label,
		children
	}: {
		label: string;
		children: Snippet;
	} = $props();
</script>

<TabsUI.Content value={label} class="mt-0 [&>pre]:mt-2">
	{@render children()}
</TabsUI.Content>
