<script lang="ts">
	import AutoBreadcrumb from "$lib/components/nav/auto-breadcrumb.svelte";
	import SocialLinks, { type SocialLink } from "$lib/components/nav/social-links.svelte";
	import DarkModeSwitcher from "$lib/components/theme/dark-mode-switcher.svelte";
	import LanguageSwitcher from "$lib/components/language-switcher.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	let { socialLinks = [] }: { socialLinks?: SocialLink[] } = $props();
</script>

<header class="bg-background sticky top-0 z-50 flex h-14 shrink-0 flex-row items-center justify-between border-b px-3">
	<div class="flex items-center gap-2">
		<Sidebar.Trigger />
		<AutoBreadcrumb />
	</div>
	<div class="flex items-center gap-1">
		<div class="hidden items-center md:flex">
			<SocialLinks links={socialLinks} />
		</div>
		<LanguageSwitcher />
		<DarkModeSwitcher />
	</div>
</header>
