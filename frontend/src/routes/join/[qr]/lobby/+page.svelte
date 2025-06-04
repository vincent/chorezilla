<script lang="ts">
	import CourtLoading from '$lib/components/court-loading/court-loading.svelte';
	import CourtLobby from '$lib/components/court-lobby/court-lobby.svelte';
	import type { CourtsResponse } from '$lib/pocketbase/generated-types';

	let { data }: { data: { court: Promise<CourtsResponse> } } = $props();
</script>

<div class="flex h-full flex-col px-4">
	{#await data.court}
		<CourtLoading />
	{:then court}
		<CourtLobby {court} />
	{:catch}
		unknown court
	{/await}
</div>
