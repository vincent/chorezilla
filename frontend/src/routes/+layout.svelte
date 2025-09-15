<script lang="ts">
	import '../app.css';
	import { initNotifications } from '$lib/hooks/perm-notifications.svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import Header from '$lib/components/Header.svelte';
    import { page } from '$app/state';
	import { client } from '$lib/pocketbase';
	import { currentHousehold } from '$lib/stores/households';

	const { data, children } = $props();
	const metadata = $derived(data.metadata ?? {});
	const { name: siteName, url: siteUrl, logo: siteLogo } = $derived(data.config.site ?? {});

	$effect(() => {
		if (page.error) metadata.title = page.error.message;
		if (client.authStore.isValid) initNotifications(data.config.vapidPublicKey, true)
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

	<div class="bg-red-100 text-red-600"></div>
	<div class="bg-orange-100 text-orange-600"></div>
	<div class="bg-amber-100 text-amber-600"></div>
	<div class="bg-yellow-100 text-yellow-600"></div>
	<div class="bg-lime-100 text-lime-600"></div>
	<div class="bg-green-100 text-green-600"></div>
	<div class="bg-emerald-100 text-emerald-600"></div>
	<div class="bg-teal-100 text-teal-600"></div>
	<div class="bg-cyan-100 text-cyan-600"></div>
	<div class="bg-sky-100 text-sky-600"></div>
	<div class="bg-blue-100 text-blue-600"></div>
	<div class="bg-indigo-100 text-indigo-600"></div>
	<div class="bg-violet-100 text-violet-600"></div>
	<div class="bg-purple-100 text-purple-600"></div>
	<div class="bg-fuchsia-100 text-fuchsia-600"></div>
	<div class="bg-pink-100 text-pink-600"></div>
	<div class="bg-rose-100 text-rose-600"></div>
	<div class="bg-slate-100 text-slate-600"></div>
</div>
