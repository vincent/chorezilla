<script lang="ts">
	import CourtLoading from '$lib/components/court-loading/court-loading.svelte';
	import MatchInProgress from '$lib/components/match-in-progress/match-in-progress.svelte';
	import type { MatchesResponse } from '$lib/pocketbase/generated-types';

	let { data }: { data: { match: Promise<MatchesResponse> } } = $props();
</script>

<div class="flex h-full flex-col px-4">
	{#await data.match}
		<CourtLoading />
	{:then match}
		<MatchInProgress {match} court={(match.expand as any)?.court} />
	{:catch}
		unknown match
	{/await}
</div>
