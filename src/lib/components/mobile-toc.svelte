<script lang="ts">
	import { toc } from '$lib/docs/toc.svelte';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import ListIcon from '@lucide/svelte/icons/list';

	let open = $state(false);

	function handleClick(id: string) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
			toc.activeId = id;
			open = false;
		}
	}
</script>

{#if toc.items.length > 0}
	<div class="border-border bg-muted/50 mb-6 rounded-lg border lg:hidden">
		<button
			onclick={() => (open = !open)}
			class="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium"
		>
			<ListIcon class="size-4" />
			<span>On this page</span>
			<ChevronDownIcon class="ml-auto size-4 transition-transform {open ? 'rotate-180' : ''}" />
		</button>
		{#if open}
			<nav class="border-border border-t px-4 py-3">
				<ul class="space-y-1 text-sm">
					{#each toc.items as item (item.id)}
						<li style:padding-left="{(item.depth - 2) * 12}px">
							<button
								onclick={() => handleClick(item.id)}
								class="text-muted-foreground hover:text-foreground w-full py-1 text-left transition-colors {toc.activeId === item.id ? 'text-foreground font-medium' : ''}"
							>
								{item.text}
							</button>
						</li>
					{/each}
				</ul>
			</nav>
		{/if}
	</div>
{/if}
