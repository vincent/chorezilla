<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { ModeWatcher } from 'mode-watcher';
	import NavMini from '$lib/components/nav-mini/nav-mini.svelte';
	import Notifications from '$lib/components/notifications/notifications.svelte';

	const { data, children } = $props();
	const metadata = $derived(data.metadata ?? {});
	const { name: siteName, url: siteUrl, logo: siteLogo } = $derived(data.config.site ?? {});

	$effect(() => {
		if ($page.error) metadata.title = $page.error.message;
	});
</script>

<svelte:head>
	<title>{metadata.title} | {siteName}</title>
</svelte:head>

<ModeWatcher />
<NavMini />
{@render children()}

<Notifications vapidPublicKey={data.config.vapidPublicKey} />
