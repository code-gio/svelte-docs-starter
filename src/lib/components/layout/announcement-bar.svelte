<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import XIcon from "@lucide/svelte/icons/x";

	interface Props {
		message: string;
		link?: string;
		linkText?: string;
	}

	let { message, link, linkText = "Learn more" }: Props = $props();

	function hashMessage(msg: string): string {
		let hash = 0;
		for (let i = 0; i < msg.length; i++) {
			const char = msg.charCodeAt(i);
			hash = ((hash << 5) - hash + char) | 0;
		}
		return "announcement-" + Math.abs(hash).toString(36);
	}

	const storageKey = hashMessage(message);

	let dismissed = $state(false);

	$effect(() => {
		if (typeof window !== "undefined") {
			dismissed = localStorage.getItem(storageKey) === "true";
		}
	});

	function dismiss() {
		dismissed = true;
		if (typeof window !== "undefined") {
			localStorage.setItem(storageKey, "true");
		}
	}
</script>

{#if !dismissed}
	<div class="bg-primary text-primary-foreground relative flex w-full items-center justify-center px-10 py-2 text-center text-sm">
		<span>
			{message}
			{#if link}
				<a href={link} class="ml-1 underline underline-offset-4 hover:opacity-80">{linkText}</a>
			{/if}
		</span>
		<Button
			variant="ghost"
			size="icon"
			class="absolute right-2 top-1/2 size-6 -translate-y-1/2 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
			onclick={dismiss}
			aria-label="Dismiss announcement"
		>
			<XIcon class="size-3.5" />
		</Button>
	</div>
{/if}
