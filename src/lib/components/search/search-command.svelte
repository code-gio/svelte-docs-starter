<script lang="ts">
	import { goto } from "$app/navigation";
	import SearchIcon from "@lucide/svelte/icons/search";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Command from "$lib/components/ui/command/index.js";
	import { getNavigation } from "$lib/docs/index.js";

	interface PagefindResult {
		url: string;
		meta: { title: string };
		excerpt: string;
	}

	let open = $state(false);
	let query = $state('');
	let searchResults = $state<PagefindResult[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let pagefind: any = $state(null);
	let searching = $state(false);

	const navigation = getNavigation();

	async function loadPagefind() {
		if (pagefind) return;
		try {
			// Pagefind is generated at build time into the static dir.
			// We must use dynamic import with a full URL to avoid Vite's static analysis.
			const pagefindUrl = `${window.location.origin}/pagefind/pagefind.js`;
			pagefind = await import(/* @vite-ignore */ pagefindUrl);
			await pagefind.init();
		} catch {
			// Pagefind not available (dev mode or not built yet)
			pagefind = null;
		}
	}

	let debounceTimer: ReturnType<typeof setTimeout>;

	$effect(() => {
		const q = query;
		clearTimeout(debounceTimer);
		if (!q || q.length < 2) {
			searchResults = [];
			searching = false;
			return;
		}

		searching = true;
		debounceTimer = setTimeout(async () => {
			if (!pagefind) await loadPagefind();
			if (!pagefind) { searching = false; return; }

			try {
				const search = await pagefind.search(q);
				const results = await Promise.all(
					search.results.slice(0, 8).map((r: any) => r.data())
				);
				searchResults = results;
			} catch {
				searchResults = [];
			}
			searching = false;
		}, 150);

		return () => clearTimeout(debounceTimer);
	});

	function navigate(url: string) {
		open = false;
		query = '';
		searchResults = [];
		goto(url);
	}

	function handleKeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key === "k") {
			e.preventDefault();
			open = !open;
			if (open) loadPagefind();
		}
	}

	function handleOpenChange(isOpen: boolean) {
		if (isOpen) loadPagefind();
		else {
			query = '';
			searchResults = [];
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<Button
	variant="outline"
	class="text-muted-foreground relative h-8 w-full justify-start rounded-md text-sm"
	onclick={() => { open = true; loadPagefind(); }}
>
	<SearchIcon class="mr-2 size-4" />
	<span class="inline-flex">Search docs...</span>
	<kbd
		class="bg-muted text-muted-foreground pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium sm:flex"
	>
		<span class="text-xs">⌘</span>K
	</kbd>
</Button>

<Command.Dialog bind:open onOpenChange={handleOpenChange}>
	<Command.Input placeholder="Search documentation..." bind:value={query} />
	<Command.List>
		<Command.Empty>
			{#if searching}
				Searching...
			{:else if query.length > 0}
				No results found.
			{:else}
				Type to search...
			{/if}
		</Command.Empty>

		{#if searchResults.length > 0}
			<Command.Group heading="Results">
				{#each searchResults as result (result.url)}
					<Command.Item onSelect={() => navigate(result.url)}>
						<FileTextIcon class="shrink-0" />
						<div class="flex flex-col gap-0.5 overflow-hidden">
							<span class="truncate">{result.meta.title}</span>
							{#if result.excerpt}
								<span class="text-muted-foreground truncate text-xs">
									{@html result.excerpt}
								</span>
							{/if}
						</div>
					</Command.Item>
				{/each}
			</Command.Group>
		{:else if !query}
			{#each navigation as section (section.title)}
				<Command.Group heading={section.title}>
					{#each section.items ?? [] as item (item.title)}
						{#if item.href}
							<Command.Item onSelect={() => navigate(item.href ?? '')}>
								<FileTextIcon />
								<span>{item.title}</span>
							</Command.Item>
						{/if}
					{/each}
				</Command.Group>
			{/each}
		{/if}
	</Command.List>
</Command.Dialog>
