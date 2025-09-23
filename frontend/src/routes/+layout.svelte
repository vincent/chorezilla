<script lang="ts">
	import '../app.css';
	import { initNotifications } from '$lib/hooks/perm-notifications.svelte';
	import { syncCurrentHouseholdData, syncRemoteData } from '$lib/stores/sync';
	import { currentHousehold, households } from '$lib/stores/households';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import Header from '$lib/components/Header.svelte';
	import { client } from '$lib/pocketbase';
	import { fade } from 'svelte/transition';
	import { Toaster } from 'svelte-sonner';
	import { page } from '$app/state';
	import { isAdmin } from '$lib/stores/auth';
	import type { Household } from '$lib/models';
	import { goto } from '$app/navigation';

	const { data, children } = $props();
	const metadata = $derived(data.metadata ?? {});

	function switchHousehold(h: Household) {
		currentHousehold.set(h);
		syncCurrentHouseholdData();
		if (page.url.pathname.includes('/households/add')) goto('/');
	}

	$effect(() => {
		if (client.authStore.isValid) {
			initNotifications(data.config.vapidPublicKey, true);
			syncRemoteData();
		}
	});
</script>

<svelte:head>
	<title>ChoreZilla | {metadata.title}</title>
</svelte:head>

<div class="bg-gray-50 dark:bg-gray-800 h-screen font-sans">
	<Header active={$currentHousehold} households={$households} setActive={switchHousehold} />

	{#key page.url.pathname}
		<div in:fade={{ duration: 200, delay: 200 }} out:fade={{ duration: 200 }}>
			<section class="mb-8">
				{@render children?.()}
			</section>
		</div>
	{/key}

	{#if $currentHousehold}
		<BottomNav active={page.route.id} isAdmin={$isAdmin} />
	{/if}

	<Toaster position="top-center" richColors />

	<div
		class="
		bg-red-100 text-red-600
		bg-orange-100 text-orange-600
		bg-amber-100 text-amber-600
		bg-yellow-100 text-yellow-600
		bg-lime-100 text-lime-600
		bg-green-100 text-green-600
		bg-emerald-100 text-emerald-600
		bg-teal-100 text-teal-600
		bg-cyan-100 text-cyan-600
		bg-sky-100 text-sky-600
		bg-blue-100 text-blue-600
		bg-indigo-100 text-indigo-600
		bg-violet-100 text-violet-600
		bg-purple-100 text-purple-600
		bg-fuchsia-100 text-fuchsia-600
		bg-pink-100 text-pink-600
		bg-rose-100 text-rose-600
		bg-slate-100 text-slate-600"
	></div>
</div>
