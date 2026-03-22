<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { docsConfig } from '$lib/docs/config.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import LanguagesIcon from '@lucide/svelte/icons/languages';
	import CheckIcon from '@lucide/svelte/icons/check';

	let i18n = docsConfig.i18n;

	function getCurrentLocale(): string {
		if (!i18n) return 'en';
		const pathParts = page.url.pathname.split('/').filter(Boolean);
		// Check if first segment after /docs is a locale code
		if (pathParts[0] === 'docs' && pathParts[1]) {
			const match = i18n.locales.find((l) => l.code === pathParts[1]);
			if (match) return match.code;
		}
		return i18n.defaultLocale;
	}

	function switchLocale(code: string) {
		if (!i18n) return;
		const currentLocale = getCurrentLocale();
		const pathname = page.url.pathname;

		if (code === i18n.defaultLocale) {
			// Remove locale prefix
			const withoutLocale = pathname.replace(`/${currentLocale}`, '');
			goto(withoutLocale || '/docs');
		} else if (currentLocale === i18n.defaultLocale) {
			// Add locale prefix after /docs
			const newPath = pathname.replace('/docs', `/docs/${code}`);
			goto(newPath);
		} else {
			// Swap locale
			const newPath = pathname.replace(`/${currentLocale}`, `/${code}`);
			goto(newPath);
		}
	}
</script>

{#if i18n && i18n.locales.length > 1}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button variant="ghost" size="icon" {...props} aria-label="Switch language">
					<LanguagesIcon class="size-4" />
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end">
			{#each i18n.locales as locale (locale.code)}
				<DropdownMenu.Item onSelect={() => switchLocale(locale.code)}>
					{#if locale.flag}
						<span>{locale.flag}</span>
					{/if}
					{locale.label}
					{#if getCurrentLocale() === locale.code}
						<CheckIcon class="ms-auto size-4" />
					{/if}
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
