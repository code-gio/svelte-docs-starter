<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import ThumbsUpIcon from "@lucide/svelte/icons/thumbs-up";
	import ThumbsDownIcon from "@lucide/svelte/icons/thumbs-down";

	let feedback: "up" | "down" | null = $state(null);
</script>

<div class="flex items-center gap-2 text-sm text-muted-foreground">
	{#if feedback}
		<span>Thanks for the feedback!</span>
	{:else}
		<span>Was this page helpful?</span>
		<Button
			variant="ghost"
			size="icon-sm"
			onclick={() => (feedback = "up")}
			aria-label="Yes, this page was helpful"
		>
			<ThumbsUpIcon />
		</Button>
		<Button
			variant="ghost"
			size="icon-sm"
			onclick={() => (feedback = "down")}
			aria-label="No, this page was not helpful"
		>
			<ThumbsDownIcon />
		</Button>
	{/if}
</div>
