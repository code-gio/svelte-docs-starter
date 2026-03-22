<script lang="ts">
	import { goto } from '$app/navigation';
	import type { NavItem } from '$lib/docs/types.js';

	interface Props {
		prev?: NavItem;
		next?: NavItem;
	}

	let { prev, next }: Props = $props();

	function handleKeydown(event: KeyboardEvent) {
		const target = event.target as HTMLElement;
		const tagName = target.tagName.toLowerCase();

		if (tagName === 'input' || tagName === 'textarea' || target.isContentEditable) {
			return;
		}

		if (event.key === 'ArrowLeft' && prev?.href) {
			goto(prev.href);
		} else if (event.key === 'ArrowRight' && next?.href) {
			goto(next.href);
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />
