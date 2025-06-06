<script lang="ts">
	import CourtLanding from '$lib/components/court-landing/court-landing.svelte';
	import CourtLoading from '$lib/components/court-loading/court-loading.svelte';
	import * as Alert from '$lib/components/ui/alert';

	let { data } = $props();
</script>

<div class="flex h-full w-full flex-col px-4">
	{#await data.court}
		<CourtLoading />
	{:then court}
		<CourtLanding {court} />
	{:catch}
		<Alert.Root>
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>Can't display court page.</Alert.Description>
		</Alert.Root>
	{/await}
</div>
