<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import InfoIcon from '@lucide/svelte/icons/info';
	import TriangleAlertIcon from '@lucide/svelte/icons/triangle-alert';
	import LightbulbIcon from '@lucide/svelte/icons/lightbulb';
	import OctagonXIcon from '@lucide/svelte/icons/octagon-x';

	let {
		type = 'note',
		title,
		children
	}: {
		type?: 'note' | 'warning' | 'tip' | 'danger';
		title?: string;
		children: Snippet;
	} = $props();

	const config = {
		note: { icon: InfoIcon, label: 'Note', class: 'border-blue-500/40 bg-blue-500/5 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400' },
		warning: { icon: TriangleAlertIcon, label: 'Warning', class: 'border-yellow-500/40 bg-yellow-500/5 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400' },
		tip: { icon: LightbulbIcon, label: 'Tip', class: 'border-green-500/40 bg-green-500/5 [&>svg]:text-green-600 dark:[&>svg]:text-green-400' },
		danger: { icon: OctagonXIcon, label: 'Danger', class: 'border-red-500/40 bg-red-500/5 [&>svg]:text-red-600 dark:[&>svg]:text-red-400' }
	} as const;

	let current = $derived(config[type]);
	let Icon = $derived(current.icon);
</script>

<div class="not-prose my-6">
	<Alert.Root class={current.class}>
		<Icon />
		<Alert.Title>{title ?? current.label}</Alert.Title>
		<Alert.Description>
			{@render children()}
		</Alert.Description>
	</Alert.Root>
</div>
