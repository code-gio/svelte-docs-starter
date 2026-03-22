<script lang="ts">
	import { page } from "$app/state";
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { docsConfig } from "$lib/docs/config.js";
	import type { NavItem } from "$lib/docs/types.js";
	import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import type { ComponentProps } from "svelte";

	let {
		navigation = [],
		ref = $bindable(null),
		...restProps
	}: ComponentProps<typeof Sidebar.Root> & { navigation?: NavItem[] } = $props();

	function isActive(href: string | undefined): boolean {
		if (!href) return false;
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}

	function sectionHasActive(section: NavItem): boolean {
		return section.items?.some((item) => isActive(item.href)) ?? false;
	}
</script>

<Sidebar.Root bind:ref aria-label="Documentation navigation" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="/docs" {...props}>
							<div
								class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
							>
								<GalleryVerticalEndIcon class="size-4" />
							</div>
							<div class="flex flex-col gap-0.5 leading-none">
								<span class="font-medium">{docsConfig.site.title}</span>
								<span class="">v1.0.0</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Documentation</Sidebar.GroupLabel>
			<Sidebar.Menu>
				{#each navigation as section (section.title)}
					<Collapsible.Root open={sectionHasActive(section)} class="group/collapsible">
						{#snippet child({ props })}
							<Sidebar.MenuItem {...props}>
								<Collapsible.Trigger>
									{#snippet child({ props })}
										<Sidebar.MenuButton {...props} tooltipContent={section.title}>
											{#if section.icon}
												<section.icon />
											{/if}
											<span>{section.title}</span>
											<ChevronRightIcon
												class="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
											/>
										</Sidebar.MenuButton>
									{/snippet}
								</Collapsible.Trigger>
								<Collapsible.Content>
									<Sidebar.MenuSub>
										{#each section.items ?? [] as item (item.title)}
											<Sidebar.MenuSubItem>
												<Sidebar.MenuSubButton isActive={isActive(item.href)}>
													{#snippet child({ props })}
														<a href={item.href ?? '#'} {...props}>
															<span>{item.title}</span>
														</a>
													{/snippet}
												</Sidebar.MenuSubButton>
											</Sidebar.MenuSubItem>
										{/each}
									</Sidebar.MenuSub>
								</Collapsible.Content>
							</Sidebar.MenuItem>
						{/snippet}
					</Collapsible.Root>
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>
