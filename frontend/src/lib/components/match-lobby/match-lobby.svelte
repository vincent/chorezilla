<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import type { CourtsResponse, MatchesResponse, MatchParticipantsResponse } from '$lib/pocketbase/generated-types';
	import { CheckIcon, HourglassIcon	} from 'lucide-svelte';
	import CourtTitle from '../court-title/court-title.svelte';
	import { client } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { toast } from "svelte-sonner";
	import { onDestroy, onMount } from 'svelte';

	let { court, match }: { court: CourtsResponse, match: MatchesResponse } = $props();

	let own = $state(match.creator === client.authStore.record?.id);
	let participants = $state<MatchParticipantsResponse[]>([])
	let error = $state(null)

	// TODO: better realtime
	let to = $state(0)
	onMount(() => to = setInterval(listParticipants, 5 * 1000))
	onDestroy(() => clearInterval(to))
	listParticipants();

	function listParticipants() {
		client.collection("match_participants")
			.getFullList<MatchParticipantsResponse>({
				filter: client.filter("match = {:id}", match),
				expand: 'user',
			})
			.then(list => participants = list)
	}
	
	function startMatch() {
		client
			.send(`/api/match/start`, { method: "post", body: { match: match.id } })
			.then(_ => {
				toast.success("Match started");
				goto(`/match/${match.id}/in-progress`)
			})
			.catch(e => error = e)
	}

	function callChallengers() {
		client
			.send(`/api/match/call`, { method: "post", body: { match: match.id } })
			.then(count => count
				? toast.success(`${count} challengers called`)
				: toast.warning(`No challengers found`)
			)
			.catch(e => error = e)
	}

	function cancelMatch() {
		client
			.send(`/api/match/cancel`, { method: "post", body: { match: match.id } })
			.then(_ => {
				toast.warning("Match cancelled");
				goto(`/join/${court.qr_code}`);
			})
			.catch(e => error = e)
	}
</script>

<CourtTitle {court}>
	{#snippet after()}
		<h1 class="text-xl tracking-tight">lobby</h1>
	{/snippet}
</CourtTitle>
<Separator class="my-4" />
<div class="flex h-full w-full flex-col gap-4 overflow-y-auto px-4 text-sm">
	{#each participants as row}
		<div class="flex gap-4">
			<Label class="me-auto text-2xl"
				>{(row.expand as any).user.name}
				{#if row.status === 'creator'}<span class="opacity-50"> host</span>{/if}</Label
			>
			{#if row.status === 'creator'}
				<Button class="w-10" disabled><CheckIcon /></Button>
			{:else if row.status === 'accepted'}
				{#if own}
					<Button class="w-10"><CheckIcon /></Button>
				{:else}
					<Button class="w-10" disabled={!own}><CheckIcon /></Button>
				{/if}
			{:else if row.status === 'waiting'}
				{#if own}
					<Button class="w-10" variant="outline"><CheckIcon /></Button>
				{:else}
					<Button class="w-10" disabled variant="outline"><HourglassIcon /></Button>
				{/if}
			{/if}
		</div>
	{/each}
	<div class="mt-auto flex flex-col gap-4 py-8">
		{#if own}
			<Button
				variant="outline"
				class="hover:dark:bg-gree7-500 h-30 w-full bg-green-500 text-2xl hover:bg-green-700 dark:bg-green-500"
				disabled={participants.length < 2}
				onclick={startMatch}>Start the match !</Button
			>
			<Button
				variant="outline"
				class="h-30 w-full text-2xl"
				onclick={callChallengers}>Call for challengers</Button>
			<Button
				variant="outline"
				class="h-20 w-full bg-red-500 text-2xl hover:bg-red-700 dark:bg-red-500 hover:dark:bg-red-700"
				onclick={cancelMatch}>Cancel</Button
			>
		{:else}
			<Button
				variant="outline"
				class="h-20 w-full bg-red-500 text-2xl hover:bg-red-700 dark:bg-red-500 hover:dark:bg-red-700"
				href={`/join/${court.qr_code}`}>Leave</Button
			>
		{/if}
	</div>
</div>
