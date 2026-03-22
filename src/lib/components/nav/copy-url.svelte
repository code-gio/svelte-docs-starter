<script lang="ts">
	import { page } from "$app/state";
	import { Button } from "$lib/components/ui/button/index.js";
	import LinkIcon from "@lucide/svelte/icons/link";
	import CheckIcon from "@lucide/svelte/icons/check";

	let copied = $state(false);

	function copyUrl() {
		const url = page.url.href;
		navigator.clipboard.writeText(url).then(() => {
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		});
	}
</script>

<Button variant="ghost" size="icon-sm" onclick={copyUrl} aria-label="Copy page URL">
	{#if copied}
		<CheckIcon />
	{:else}
		<LinkIcon />
	{/if}
</Button>
