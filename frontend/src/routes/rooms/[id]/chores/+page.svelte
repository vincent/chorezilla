<script lang="ts">
	import ChoresSection from "$lib/components/ChoresSection.svelte";
	import { page } from "$app/state";
	import { chores } from "$lib/stores/chores";
	import { rooms } from "$lib/stores/rooms";
	import { onMount } from "svelte";
	import type { ChoresRecord, RoomsRecord } from "$lib/pocketbase/generated-types";
	import { Pen } from "@lucide/svelte";

	let roomId = String(page.params.id)
	let room = $state(null as unknown as RoomsRecord)
	let roomChores = $state<ChoresRecord[]>([])

	onMount(() => {
		Promise.all([
			chores.loadCollection(),
			rooms.loadCollection(),
		])
		.then(() => rooms.findRoom(roomId))
		.then(r => {
			if (!r) return;
			roomChores = chores.findChoresByRoomId(roomId)
			room = r
		})
	})
</script>

<!-- Main Content -->
<main class="container mx-auto px-4 py-6">
	{#if room}
		<ChoresSection title={`Chores in ${room.name}`} chores={roomChores}>
			{#snippet subtitle()}
				<a class="flex text-gray-500 dark:text-gray-400" href={`/rooms/${room?.id}/edit`}>edit room <Pen class="ms-2"/></a>
			{/snippet}
			{#snippet empty()}
				<span class="text-gray-500 dark:text-gray-400">No chore in {room.name}</span>
			{/snippet}
		</ChoresSection>
	{:else}
		<span class="text-gray-500 dark:text-gray-400">No such room</span>
	{/if}
</main>