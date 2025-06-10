<script lang="ts">
	import { geoLocationStatus, waitForGeolocation } from '$lib/hooks';
	import { LoaderIcon } from 'lucide-svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let { vapidPublicKey, children } = $props();

	onMount(() => waitForGeolocation(vapidPublicKey, page.url.pathname));
</script>

{#if $geoLocationStatus !== 'granted'}
	<div class="flex flex-col items-center">
		<LoaderIcon size={50} class="m-8 animate-[spin_5s_linear_infinite]" />
		<div class="text-center">Waiting for geolocation</div>
	</div>
{:else}
	{@render children?.()}
{/if}
