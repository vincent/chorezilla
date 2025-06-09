<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from "$lib/components/ui/sonner";
	import NavMini from '$lib/components/nav-mini/nav-mini.svelte';
	import { initGeoLocation, initMatchNotifications, redirectIfNoGeoLocation } from '$lib/hooks';

	const { data, children } = $props();
	const metadata = $derived(data.metadata ?? {});
	const { name: siteName, url: siteUrl, logo: siteLogo } = $derived(data.config.site ?? {});

	$effect(() => {
		if ($page.error) metadata.title = $page.error.message;
	});

	onMount(() => setTimeout(() => {
		initMatchNotifications(data.config.vapidPublicKey)
		initGeoLocation()

		setTimeout(() => {
			redirectIfNoGeoLocation($page.url.toString())
		}, 500)
	}, 100))
</script>

<svelte:head>
	<title>{metadata.title} | {siteName}</title>
</svelte:head>

<ModeWatcher />
<NavMini />
{@render children()}

<Toaster />
