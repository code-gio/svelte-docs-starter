<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		cols = 2,
		children
	}: {
		cols?: number;
		children: Snippet;
	} = $props();
</script>

<div
	class="not-prose my-6 grid gap-4"
	style:grid-template-columns="repeat({cols}, minmax(0, 1fr))"
>
	{@render children()}
</div>
