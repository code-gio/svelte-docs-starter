<script lang="ts">
	import SearchCommand from "$lib/components/search/search-command.svelte";
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { toc } from "$lib/docs/toc.svelte";
	import type { TableOfContentsItem } from "$lib/docs/types.js";
	import MinusIcon from "@lucide/svelte/icons/minus";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	interface TocSection {
		parent: TableOfContentsItem;
		children: TableOfContentsItem[];
	}

	function buildTree(items: TableOfContentsItem[]): TocSection[] {
		const sections: TocSection[] = [];
		let current: TocSection | null = null;

		for (const item of items) {
			if (item.depth === 2) {
				current = { parent: item, children: [] };
				sections.push(current);
			} else if (current) {
				current.children.push(item);
			} else {
				sections.push({ parent: item, children: [] });
			}
		}

		return sections;
	}

	function sectionHasActive(section: TocSection): boolean {
		return (
			toc.activeId === section.parent.id ||
			section.children.some((c) => toc.activeId === c.id)
		);
	}

	function handleClick(id: string) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
			toc.activeId = id;
		}
	}

	$effect(() => {
		const items = toc.items;
		if (items.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						toc.activeId = entry.target.id;
					}
				}
			},
			{ rootMargin: '-80px 0px -80% 0px' }
		);

		for (const item of items) {
			const el = document.getElementById(item.id);
			if (el) observer.observe(el);
		}

		return () => observer.disconnect();
	});
</script>

<Sidebar.Root
	bind:ref
	collapsible="none"
	class="sticky top-0 hidden h-svh border-s lg:flex"
	{...restProps}
>
	<Sidebar.Header class="p-3">
		<SearchCommand />
	</Sidebar.Header>
	<Sidebar.Content>
		{#if toc.items.length > 0}
			<Sidebar.Group>
				<Sidebar.GroupLabel>On this page</Sidebar.GroupLabel>
				<Sidebar.Menu>
					{#each buildTree(toc.items) as section (section.parent.id)}
						{#if section.children.length > 0}
							<Collapsible.Root open={sectionHasActive(section)} class="group/collapsible">
								{#snippet child({ props: collapsibleProps })}
									<Sidebar.MenuItem {...collapsibleProps}>
										<Collapsible.Trigger>
											{#snippet child({ props })}
												<Sidebar.MenuButton
													{...props}
													class={sectionHasActive(section) ? 'font-medium' : ''}
												>
													<span>{section.parent.text}</span>
													<PlusIcon
														class="ms-auto group-data-[state=open]/collapsible:hidden"
													/>
													<MinusIcon
														class="ms-auto group-data-[state=closed]/collapsible:hidden"
													/>
												</Sidebar.MenuButton>
											{/snippet}
										</Collapsible.Trigger>
										<Collapsible.Content>
											<Sidebar.MenuSub>
												{#each section.children as subItem (subItem.id)}
													<Sidebar.MenuSubItem>
														<Sidebar.MenuSubButton isActive={toc.activeId === subItem.id}>
															{#snippet child({ props })}
																<button
																	{...props}
																	onclick={() => handleClick(subItem.id)}
																>
																	<span>{subItem.text}</span>
																</button>
															{/snippet}
														</Sidebar.MenuSubButton>
													</Sidebar.MenuSubItem>
												{/each}
											</Sidebar.MenuSub>
										</Collapsible.Content>
									</Sidebar.MenuItem>
								{/snippet}
							</Collapsible.Root>
						{:else}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton
									class={toc.activeId === section.parent.id ? 'font-medium' : ''}
									onclick={() => handleClick(section.parent.id)}
								>
									<span>{section.parent.text}</span>
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/if}
					{/each}
				</Sidebar.Menu>
			</Sidebar.Group>
		{/if}
	</Sidebar.Content>
</Sidebar.Root>
