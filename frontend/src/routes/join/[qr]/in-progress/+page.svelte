<script lang="ts">
	import CourtInProgress from '$lib/components/court-in-progress/court-in-progress.svelte';
	import CourtLoading from '$lib/components/court-loading/court-loading.svelte';
	import type { CourtsResponse } from '$lib/pocketbase/generated-types';

	let { data }: { data: { court: Promise<CourtsResponse> } } = $props();
</script>

<div class="flex h-full w-full flex-col items-center justify-center px-4">
	{#await data.court}
		<CourtLoading />
	{:then court}
		<CourtInProgress {court} />
	{:catch}
		unknown court
	{/await}
</div>
