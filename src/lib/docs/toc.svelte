<script module lang="ts">
	import type { TableOfContentsItem } from './types.js';

	class TocState {
		items = $state<TableOfContentsItem[]>([]);
		activeId = $state('');

		extractHeadings(container: HTMLElement, minDepth = 2, maxDepth = 3): void {
			const selectors = Array.from(
				{ length: maxDepth - minDepth + 1 },
				(_, i) => `h${minDepth + i}`
			);
			const headings = container.querySelectorAll<HTMLElement>(selectors.join(', '));

			this.items = Array.from(headings)
				.filter((el) => el.id)
				.map((el) => ({
					id: el.id,
					text: (el.textContent?.trim() ?? '').replace(/^#+\s*/, ''),
					depth: parseInt(el.tagName[1])
				}));
		}

		clear(): void {
			this.items = [];
			this.activeId = '';
		}
	}

	export const toc = new TocState();
</script>
