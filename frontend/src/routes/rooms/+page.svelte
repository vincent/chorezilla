<script lang="ts">
	import RoomCard from '$lib/components/RoomCard.svelte';
	import { chores, memberIdsByRoom } from '$lib/stores/chores.js';
	import { Plus, Search } from '@lucide/svelte';
	import { isAdmin } from '$lib/stores/auth';
	import { rooms } from '$lib/stores/rooms';
	import { onMount } from 'svelte';

	onMount(() => {
		rooms.loadCollection();
		chores.loadCollection();
	});

	let filter = $state('');
	let filteredRooms = $derived(
		$rooms.filter(
			(r) =>
				!filter ||
				r.name.toLowerCase().includes(filter) ||
				r.location?.toLowerCase().includes(filter) ||
				r.description?.toLowerCase().includes(filter)
		)
	);

	$effect(() => {
		console.log($memberIdsByRoom);
	});
</script>

<!-- Main Content -->
<main class="container mx-auto px-4 py-6">
	<!-- Search Bar -->
	<div class="relative mb-6">
		<input
			bind:value={filter}
			type="text"
			placeholder="Search rooms..."
			class="w-full pl-10 pr-4 py-2 rounded-lg dark:text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800"
		/>
		<Search class="absolute left-3 top-2.5 text-gray-400" />
	</div>

	<!-- Rooms Grid -->
	<div class="grid grid-cols-1 gap-4">
		{#each filteredRooms as room (room.id)}
			<RoomCard {room} members={$memberIdsByRoom[room.id]?.length ?? 0} />
		{/each}

		{#if $isAdmin}
			<a
				href="/rooms/add"
				class="room-card border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-indigo-300 transition-colors"
			>
				<div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
					<Plus class="text-indigo-600" />
				</div>
				<h3 class="font-medium text-gray-800 dark:text-white">Add new room</h3>
				<p class="text-gray-500 text-sm">Create a new space to manage</p>
			</a>
		{/if}
	</div>
</main>
