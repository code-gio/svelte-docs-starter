<script lang="ts">
	import { Badge as BadgeUI } from '$lib/components/ui/badge/index.js';

	let {
		text,
		variant = 'default'
	}: {
		text: string;
		variant?: 'default' | 'new' | 'deprecated' | 'experimental';
	} = $props();

	const variantMap = {
		default: { uiVariant: 'secondary' as const, class: '' },
		new: { uiVariant: 'outline' as const, class: 'border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-400' },
		deprecated: { uiVariant: 'outline' as const, class: 'border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-400' },
		experimental: { uiVariant: 'outline' as const, class: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400' }
	} as const;

	let current = $derived(variantMap[variant]);
</script>

<BadgeUI variant={current.uiVariant} class="not-prose {current.class}">{text}</BadgeUI>
