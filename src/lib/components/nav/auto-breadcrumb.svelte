<script lang="ts">
	import { page } from "$app/state";
	import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";

	function getSegments() {
		const pathname = page.url.pathname;
		const parts = pathname.split("/").filter(Boolean);
		return parts.map((part, i) => ({
			label: part
				.replace(/-/g, " ")
				.replace(/\b\w/g, (c) => c.toUpperCase()),
			href: "/" + parts.slice(0, i + 1).join("/"),
			isLast: i === parts.length - 1,
		}));
	}
</script>

<Breadcrumb.Root>
	<Breadcrumb.List>
		{#each getSegments() as segment, i}
			{#if i > 0}
				<Breadcrumb.Separator />
			{/if}
			<Breadcrumb.Item>
				{#if segment.isLast}
					<Breadcrumb.Page class="line-clamp-1">
						{segment.label}
					</Breadcrumb.Page>
				{:else}
					<Breadcrumb.Link href={segment.href} class="line-clamp-1">
						{segment.label}
					</Breadcrumb.Link>
				{/if}
			</Breadcrumb.Item>
		{/each}
	</Breadcrumb.List>
</Breadcrumb.Root>
