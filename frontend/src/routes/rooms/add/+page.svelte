<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Room } from '$lib/models';
	import { rooms } from '$lib/stores/rooms';
	import Title from '$lib/components/Title.svelte';
	import RoomForm from '$lib/components/RoomForm.svelte';
	import { currentHousehold } from '$lib/stores/households';

	function handleAdd(detail: Omit<Room, 'id'>) {
		const { name, location, description, color } = detail;
		rooms
			.addRoom({
				household: $currentHousehold.id,
				description,
				location,
				color,
				name
			})
			.then(() => goto('/rooms'));
	}
</script>

<svelte:head>
	<title>ChoreZilla | Add Room</title>
</svelte:head>

<main class="container mx-auto px-4 py-6">
	<Title title="Add a new room" />
	<RoomForm submitLabel="Add Room" onSubmit={handleAdd} />
</main>
