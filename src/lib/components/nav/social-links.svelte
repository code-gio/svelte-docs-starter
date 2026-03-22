<script lang="ts" module>
	import type { Component } from "svelte";

	import GithubIcon from "@lucide/svelte/icons/github";
	import TwitterIcon from "@lucide/svelte/icons/twitter";
	import FacebookIcon from "@lucide/svelte/icons/facebook";
	import InstagramIcon from "@lucide/svelte/icons/instagram";
	import LinkedinIcon from "@lucide/svelte/icons/linkedin";
	import YoutubeIcon from "@lucide/svelte/icons/youtube";
	import DiscordIcon from "@lucide/svelte/icons/message-circle";
	import SlackIcon from "@lucide/svelte/icons/slack";
	import TwitchIcon from "@lucide/svelte/icons/twitch";
	import MastodonIcon from "@lucide/svelte/icons/at-sign";
	import RssIcon from "@lucide/svelte/icons/rss";
	import MailIcon from "@lucide/svelte/icons/mail";
	import GlobeIcon from "@lucide/svelte/icons/globe";

	const iconMap: Record<string, Component<{ class?: string }>> = {
		github: GithubIcon,
		twitter: TwitterIcon,
		x: TwitterIcon,
		facebook: FacebookIcon,
		instagram: InstagramIcon,
		linkedin: LinkedinIcon,
		youtube: YoutubeIcon,
		discord: DiscordIcon,
		slack: SlackIcon,
		twitch: TwitchIcon,
		mastodon: MastodonIcon,
		rss: RssIcon,
		mail: MailIcon,
		email: MailIcon,
		website: GlobeIcon,
	};

	export type SocialLink = {
		platform: string;
		url: string;
		label?: string;
	};
</script>

<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";

	let { links = [] }: { links: SocialLink[] } = $props();
</script>

{#each links as link}
	{@const Icon = iconMap[link.platform.toLowerCase()]}
	{#if Icon}
		<Button
			variant="ghost"
			size="icon-sm"
			href={link.url}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={link.label ?? link.platform}
		>
			<Icon class="size-4" />
		</Button>
	{/if}
{/each}
