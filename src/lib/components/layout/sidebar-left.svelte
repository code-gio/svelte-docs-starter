<script lang="ts">
	import { page } from "$app/state";
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { docsConfig } from "$lib/docs/config.js";
	import type { NavItem } from "$lib/docs/types.js";
	import { goto } from "$app/navigation";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import CheckIcon from "@lucide/svelte/icons/check";
	import SocialLinks, { type SocialLink } from "$lib/components/nav/social-links.svelte";
	import SearchCommand from "$lib/components/search/search-command.svelte";
	import type { ComponentProps } from "svelte";

	let {
		navigation = [],
		socialLinks = [],
		ref = $bindable(null),
		...restProps
	}: ComponentProps<typeof Sidebar.Root> & { navigation?: NavItem[]; socialLinks?: SocialLink[] } = $props();

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
				{#if docsConfig.versions}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							{#snippet child({ props })}
								<Sidebar.MenuButton
									size="lg"
									class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
									{...props}
								>
									<div
										class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
									>
										<GalleryVerticalEndIcon class="size-4" />
									</div>
									<div class="flex flex-col gap-0.5 leading-none">
										<span class="font-semibold">{docsConfig.site.title}</span>
										<span class="">{docsConfig.versions?.current}</span>
									</div>
									<ChevronsUpDownIcon class="ms-auto" />
								</Sidebar.MenuButton>
							{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content class="w-(--bits-dropdown-menu-anchor-width)" align="start">
							{#each docsConfig.versions.versions as version (version.label)}
								<DropdownMenu.Item onSelect={() => {
									if (version.href.startsWith('http')) {
										window.open(version.href, '_blank');
									} else {
										goto(version.href);
									}
								}}>
									{version.label}
									{#if version.label.includes(docsConfig.versions?.current ?? '')}
										<CheckIcon class="ms-auto" />
									{/if}
								</DropdownMenu.Item>
							{/each}
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{:else}
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
				{/if}
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
	<Sidebar.Footer class="mt-auto border-t p-3">
		<SearchCommand />
		<div class="flex items-center">
			<SocialLinks links={socialLinks} />
		</div>
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
