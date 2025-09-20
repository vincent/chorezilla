<script lang="ts">
	import ChoresSection from '$lib/components/ChoresSection.svelte';
	import type { Chore, Room } from '$lib/models';
	import { chores } from '$lib/stores/chores';
	import { isAdmin } from '$lib/stores/auth';
	import { rooms } from '$lib/stores/rooms';
	import { Pen } from '@lucide/svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let roomId = String(page.params.id);
	let room = $state(null as unknown as Room);
	let roomChores = $state<Chore[]>([]);

	onMount(() => {
		Promise.all([chores.loadCollection(), rooms.loadCollection()])
			.then(() => rooms.findRoom(roomId))
			.then((r) => {
				if (!r) return;
				roomChores = chores.findChoresByRoomId(roomId);
				room = r;
			});
	});
</script>

<svelte:head>
	{#if room}
		<title>ChoreZilla | Chores in {room.name}</title>
	{/if}
</svelte:head>

<!-- Main Content -->
<main class="container mx-auto px-4 py-6">
	{#if room}
		<ChoresSection title={`Chores in ${room.name}`} chores={roomChores}>
			{#snippet subtitle()}
				{#if $isAdmin}
					<a class="flex text-gray-500 dark:text-gray-400" href={`/rooms/${room?.id}/edit`}
						>edit room <Pen class="ms-2" /></a
					>
				{/if}
			{/snippet}
			{#snippet empty()}
				<span class="text-gray-500 dark:text-gray-400">No chore in {room.name}</span>
			{/snippet}
		</ChoresSection>
	{:else}
		<span class="text-gray-500 dark:text-gray-400">No such room</span>
	{/if}
</main>
