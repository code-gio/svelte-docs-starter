<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import DarkModeSwitcher from "$lib/components/theme/dark-mode-switcher.svelte";
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
	import BookOpenIcon from "@lucide/svelte/icons/book-open";
	import ZapIcon from "@lucide/svelte/icons/zap";
	import SearchIcon from "@lucide/svelte/icons/search";
	import PaletteIcon from "@lucide/svelte/icons/palette";
	import LayoutGridIcon from "@lucide/svelte/icons/layout-grid";
	import CodeIcon from "@lucide/svelte/icons/code";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import MoonIcon from "@lucide/svelte/icons/moon";
	import SidebarIcon from "@lucide/svelte/icons/panel-left";
	import GithubIcon from "@lucide/svelte/icons/github";
	import ExternalLinkIcon from "@lucide/svelte/icons/external-link";
	import PackageIcon from "@lucide/svelte/icons/package";

	const features = [
		{
			icon: SidebarIcon,
			title: "Collapsible Sidebar Navigation",
			description:
				"Built-in left sidebar with collapsible sections, nested pages, and a rail for quick toggling. Powered by shadcn-svelte's sidebar components.",
		},
		{
			icon: ZapIcon,
			title: "Lightning Fast",
			description:
				"Powered by SvelteKit and Vite for instant HMR, fast builds, and seamless page transitions with zero client-side overhead.",
		},
		{
			icon: SearchIcon,
			title: "Command Palette Search",
			description:
				"Press Ctrl+K to open a command palette and instantly search across all your documentation pages.",
		},
		{
			icon: MoonIcon,
			title: "Dark Mode",
			description:
				"Automatic dark and light mode with mode-watcher. Respects system preferences and persists user choice.",
		},
		{
			icon: CodeIcon,
			title: "Syntax Highlighting",
			description:
				"Beautiful code blocks powered by Shiki with support for multiple languages, line numbers, and theme-aware highlighting.",
		},
		{
			icon: FileTextIcon,
			title: "MDSvex Markdown",
			description:
				"Write docs in Markdown with full Svelte component support via MDSvex. Embed interactive examples right in your content.",
		},
		{
			icon: LayoutGridIcon,
			title: "shadcn-svelte Components",
			description:
				"Pre-configured with shadcn-svelte's component library including buttons, dialogs, tooltips, breadcrumbs, and more.",
		},
		{
			icon: PaletteIcon,
			title: "Tailwind CSS v4",
			description:
				"Styled with Tailwind CSS v4 and CSS custom properties for easy theming. Customize colors, spacing, and typography to match your brand.",
		},
	];

	const steps = [
		{
			step: "01",
			title: "Clone & Install",
			description:
				"Clone the repository and run npm install. The template comes pre-configured with SvelteKit, Tailwind CSS, shadcn-svelte, and all the tooling you need.",
			code: "npx degit code-gio/svelte-docs-starter my-docs\ncd my-docs && npm install",
		},
		{
			step: "02",
			title: "Write Your Docs",
			description:
				"Add Markdown or Svelte files in the src/content directory. MDSvex handles the rendering with full support for frontmatter, code blocks, and Svelte components.",
		},
		{
			step: "03",
			title: "Deploy Anywhere",
			description:
				"Deploy to Vercel, Netlify, Cloudflare Pages, or any Node.js host. SvelteKit adapters make deployment a single command.",
		},
	];

	const libraries = [
		{
			name: "SvelteKit",
			description: "Full-stack framework for Svelte apps",
			url: "https://svelte.dev/docs/kit",
		},
		{
			name: "Svelte 5",
			description: "Reactive UI framework with runes",
			url: "https://svelte.dev",
		},
		{
			name: "Tailwind CSS v4",
			description: "Utility-first CSS framework",
			url: "https://tailwindcss.com",
		},
		{
			name: "shadcn-svelte (bits-ui)",
			description: "Accessible UI components for Svelte",
			url: "https://shadcn-svelte.com",
		},
		{
			name: "MDSvex",
			description: "Markdown preprocessor for Svelte",
			url: "https://mdsvex.pngwn.io",
		},
		{
			name: "Shiki",
			description: "Syntax highlighting powered by TextMate grammars",
			url: "https://shiki.style",
		},
		{
			name: "mode-watcher",
			description: "Dark mode management for SvelteKit",
			url: "https://github.com/svecosystem/mode-watcher",
		},
		{
			name: "Lucide Svelte",
			description: "Beautiful open-source icon library",
			url: "https://lucide.dev",
		},
		{
			name: "tailwind-variants",
			description: "First-class variant API for Tailwind CSS",
			url: "https://www.tailwind-variants.org",
		},
		{
			name: "svelte-sonner",
			description: "Toast notifications for Svelte",
			url: "https://svelte-sonner.vercel.app",
		},
		{
			name: "Inter Variable",
			description: "Professional sans-serif typeface",
			url: "https://rsms.me/inter",
		},
		{
			name: "tw-animate-css",
			description: "Animation utilities for Tailwind CSS",
			url: "https://github.com/Wombosvideo/tw-animate-css",
		},
	];
</script>

<!-- Navbar -->
<nav class="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
	<div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<div class="flex items-center gap-2">
			<BookOpenIcon class="text-primary size-6" />
			<span class="text-lg font-bold">Svelte Docs Starter</span>
		</div>
		<div class="hidden items-center gap-6 md:flex">
			<a href="/" class="text-foreground text-sm font-medium">Home</a>
			<a href="/docs" class="text-muted-foreground hover:text-foreground text-sm">Documentation</a>
			<a href="/docs" class="text-muted-foreground hover:text-foreground text-sm">Get Started</a>
		</div>
		<div class="flex items-center gap-2">
			<DarkModeSwitcher />
			<Button variant="ghost" size="icon" href="https://github.com/code-gio/svelte-docs-starter" target="_blank" aria-label="GitHub">
				<GithubIcon class="size-4" />
			</Button>
		</div>
	</div>
</nav>

<!-- Hero Section -->
<section class="relative overflow-hidden">
	<div class="from-primary/5 via-background to-background absolute inset-0 bg-linear-to-b"></div>
	<div class="from-primary/10 to-primary/0 absolute left-1/2 top-0 hidden size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-b blur-3xl sm:block"></div>
	<div class="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:py-40">
		<div class="bg-muted text-muted-foreground mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm">
			<ZapIcon class="size-3.5" />
			<span>SvelteKit + shadcn-svelte + MDSvex</span>
		</div>
		<h1 class="text-foreground mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
			A SvelteKit documentation
			<span class="from-primary to-primary/60 bg-linear-to-r bg-clip-text text-transparent"> starter kit</span>
		</h1>
		<p class="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg sm:text-xl">
			Build beautiful, fast documentation sites with SvelteKit, Tailwind CSS v4, and shadcn-svelte.
			Write in Markdown, style with components, deploy anywhere.
		</p>
		<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Button size="lg" href="/docs" class="gap-2 px-6">
				Get Started
				<ArrowRightIcon class="size-4" />
			</Button>
			<Button variant="outline" size="lg" href="https://github.com/code-gio/svelte-docs-starter" target="_blank" class="gap-2 px-6">
				<GithubIcon class="size-4" />
				View on GitHub
			</Button>
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="border-t py-20 sm:py-28">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-14 text-center">
			<h2 class="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
				Everything you need for great docs
			</h2>
			<p class="text-muted-foreground mx-auto max-w-2xl text-lg">
				A fully featured documentation kit with sidebar navigation, search, dark mode, syntax highlighting, and more.
			</p>
		</div>
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each features as feature}
				<div class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:border-primary/20">
					<div class="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
						<feature.icon class="size-6" />
					</div>
					<h3 class="text-foreground mb-2 text-lg font-semibold">{feature.title}</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Getting Started Steps -->
<section class="bg-muted/50 border-t py-20 sm:py-28">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-14 text-center">
			<h2 class="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
				Get started in 3 simple steps
			</h2>
			<p class="text-muted-foreground mx-auto max-w-2xl text-lg">
				From clone to deployment in minutes. No complex configuration required.
			</p>
		</div>
		<div class="grid gap-8 sm:grid-cols-3">
			{#each steps as step}
				<div class="bg-background relative min-w-0 overflow-hidden rounded-xl border p-8">
					<span class="text-primary/20 absolute right-6 top-4 text-5xl font-bold">{step.step}</span>
					<h3 class="text-foreground mb-3 text-xl font-semibold">{step.title}</h3>
					<p class="text-muted-foreground mb-4 text-sm leading-relaxed">{step.description}</p>
					{#if step.code}
						<pre class="bg-muted overflow-x-auto rounded-lg p-3 text-xs"><code>{step.code}</code></pre>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Built With / Tech Stack -->
<section class="border-t py-20 sm:py-28">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-14 text-center">
			<h2 class="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
				Built with modern tools
			</h2>
			<p class="text-muted-foreground mx-auto max-w-2xl text-lg">
				Every library and tool used in this starter, linked for easy reference.
			</p>
		</div>
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each libraries as lib}
				<a
					href={lib.url}
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-start gap-4 rounded-xl border p-5 transition-all hover:shadow-lg hover:border-primary/20"
				>
					<div class="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
						<PackageIcon class="size-5" />
					</div>
					<div class="min-w-0 flex-1">
						<div class="flex items-center gap-2">
							<h3 class="text-foreground text-sm font-semibold">{lib.name}</h3>
							<ExternalLinkIcon class="text-muted-foreground size-3 opacity-0 transition-opacity group-hover:opacity-100" />
						</div>
						<p class="text-muted-foreground text-xs leading-relaxed">{lib.description}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="border-t">
	<div class="bg-primary/5 relative overflow-hidden py-20 sm:py-28">
		<div class="from-primary/10 to-primary/0 absolute right-0 top-0 hidden size-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-linear-to-b blur-3xl sm:block"></div>
		<div class="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
			<h2 class="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
				Ready to build your docs?
			</h2>
			<p class="text-muted-foreground mx-auto mb-8 max-w-xl text-lg">
				Clone the starter, add your content, and ship. Open source, free forever.
			</p>
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<Button size="lg" href="/docs" class="gap-2 px-6">
					Get Started
					<ArrowRightIcon class="size-4" />
				</Button>
				<Button variant="outline" size="lg" href="https://github.com/code-gio/svelte-docs-starter" target="_blank" class="gap-2 px-6">
					<GithubIcon class="size-4" />
					View on GitHub
				</Button>
			</div>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="border-t py-12 sm:py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			<div>
				<h4 class="text-foreground mb-4 text-sm font-semibold">Documentation</h4>
				<ul class="space-y-3">
					<li><a href="/docs" class="text-muted-foreground hover:text-foreground text-sm">Getting Started</a></li>
					<li><a href="/docs" class="text-muted-foreground hover:text-foreground text-sm">Configuration</a></li>
					<li><a href="/docs" class="text-muted-foreground hover:text-foreground text-sm">Writing Content</a></li>
					<li><a href="/docs" class="text-muted-foreground hover:text-foreground text-sm">Deployment</a></li>
				</ul>
			</div>
			<div>
				<h4 class="text-foreground mb-4 text-sm font-semibold">Core Libraries</h4>
				<ul class="space-y-3">
					<li><a href="https://svelte.dev/docs/kit" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm">SvelteKit <ExternalLinkIcon class="size-3" /></a></li>
					<li><a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm">Tailwind CSS <ExternalLinkIcon class="size-3" /></a></li>
					<li><a href="https://shadcn-svelte.com" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm">shadcn-svelte <ExternalLinkIcon class="size-3" /></a></li>
					<li><a href="https://mdsvex.pngwn.io" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm">MDSvex <ExternalLinkIcon class="size-3" /></a></li>
				</ul>
			</div>
			<div>
				<h4 class="text-foreground mb-4 text-sm font-semibold">Tools & Utilities</h4>
				<ul class="space-y-3">
					<li><a href="https://shiki.style" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm">Shiki <ExternalLinkIcon class="size-3" /></a></li>
					<li><a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm">Lucide Icons <ExternalLinkIcon class="size-3" /></a></li>
					<li><a href="https://github.com/svecosystem/mode-watcher" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm">mode-watcher <ExternalLinkIcon class="size-3" /></a></li>
					<li><a href="https://svelte-sonner.vercel.app" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm">svelte-sonner <ExternalLinkIcon class="size-3" /></a></li>
				</ul>
			</div>
			<div>
				<h4 class="text-foreground mb-4 text-sm font-semibold">Project</h4>
				<ul class="space-y-3">
					<li>
						<a href="https://github.com/code-gio/svelte-docs-starter" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm">
							<GithubIcon class="size-3.5" /> GitHub
						</a>
					</li>
					<li><a href="https://github.com/code-gio/svelte-docs-starter/issues" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm">Report an Issue <ExternalLinkIcon class="size-3" /></a></li>
					<li><a href="https://github.com/code-gio/svelte-docs-starter/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm">License <ExternalLinkIcon class="size-3" /></a></li>
				</ul>
			</div>
		</div>
		<div class="text-muted-foreground mt-12 border-t pt-8 text-center text-sm">
			Built with SvelteKit, Tailwind CSS, and shadcn-svelte by
			<a href="https://github.com/code-gio" target="_blank" rel="noopener noreferrer" class="text-foreground hover:underline">Codegio</a>
		</div>
	</div>
</footer>
