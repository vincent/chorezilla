<script lang="ts">
	import '../app.css';
	// import { initNotifications } from '$lib/hooks/perm-notifications.svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import Header from '$lib/components/Header.svelte';
    import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { client } from '$lib/pocketbase';
	import { currentHousehold } from '$lib/stores/households';

	const { data, children } = $props();
	const metadata = $derived(data.metadata ?? {});
	const { name: siteName, url: siteUrl, logo: siteLogo } = $derived(data.config.site ?? {});

    onMount(() => {
        // initNotifications('noooo', true)
    })

	$effect(() => {
		if (page.error) metadata.title = page.error.message;
	});
</script>

<svelte:head>
	<title>{metadata.title} | {siteName}</title>
</svelte:head>

<div class="bg-gray-50 dark:bg-gray-800 h-screen font-sans">

    <Header household={$currentHousehold} />

    <section class="mb-8">
        {@render children?.()}
    </section>

	{#if client.authStore.isValid}
	    <BottomNav active={page.route.id} />
	{/if}
</div>
