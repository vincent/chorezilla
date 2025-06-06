<script lang="ts">
	import type { CourtsResponse } from '$lib/pocketbase/generated-types';
	import CourtTitle from '../court-title/court-title.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import CourtHistory from './court-history.svelte';
	import { Label } from '$lib/components/ui/label';
	import CourtSettings from './court-settings.svelte';
	import { client } from '$lib/pocketbase';
	import { goto } from '$app/navigation';

	let { court }: { court: CourtsResponse } = $props();
	let error = $state(null)
	const ma = {
		id: 1,
		end_time: '2025-05-12 19:49:28 UTC',
		expand: {
			match_participants_via_match: [
				{ id: 2, expand: { user: { id: 'azd', name: 'Giovanni' } } },
				{ id: 3, expand: { user: { id: 'azdzd', name: 'Elsa' } } }
			]
		}
	};

	let lastMatchs = $state([ma, ma, ma, ma, ma, ma, ma, ma, ma, ma, ma, ma]);

	function prepareMatch() {
		client
			.send(`/api/match/prepare`, { method: "post", body: { court: court.id } })
			.then(m => {
				debugger;
				goto(`/match/${m.id}/lobby`);
			})
			.catch(e => error = e)
	}
</script>

<CourtTitle {court} />
<Separator class="my-4" />
<div class="flex flex-col gap-4 overflow-y-auto px-4 pb-4 text-sm">
	{#if court.status === 'lobby'}
		<div class="flex flex-col gap-4">
			<Button variant="outline" class="h-30 w-full text-xl" href={`${court.qr_code}/lobby`}
				>Join the lobby</Button
			>
		</div>
	{:else if court.status === 'playing'}
		<div class="flex flex-col gap-4">
			<Label for="header">Currently occupied</Label>
			<Label for="header">Come back later !</Label>
		</div>
	{:else if court.status === 'maintenance'}
		<div class="flex flex-col gap-4">
			<Label for="header">Under maintenance</Label>
			<Label for="header">Come back later !</Label>
		</div>
	{:else if court.status === 'active'}
		<Button variant="outline" class="h-30 w-full text-xl" onclick={prepareMatch}
			>Start a match</Button
		>
	{/if}

	<!-- <pre>{JSON.stringify(court, null, 2)}</pre> -->
</div>
<CourtHistory {lastMatchs} mostActive={[]}>
	{#snippet settings()}
		<CourtSettings {court} />
	{/snippet}
</CourtHistory>
