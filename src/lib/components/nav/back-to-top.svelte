<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import ArrowUpIcon from '@lucide/svelte/icons/arrow-up';

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<Button variant="ghost" size="icon-sm" onclick={scrollToTop} aria-label="Back to top">
	<ArrowUpIcon />
</Button>
