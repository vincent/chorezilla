<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { rooms } from '$lib/stores/rooms';
	import type { Room } from '$lib/models/room';
	import RoomForm from '$lib/components/RoomForm.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { RoomsRecord } from '$lib/pocketbase/generated-types';
	import { Trash } from '@lucide/svelte';

	let id = '';
	let initial: RoomsRecord | null = null;

	onMount(() => {
		
		if (!page.params.id) return;
		id = page.params.id;

		rooms.loadCollection().then(() => {
			const room = rooms.findRoom(id);
			if (room) {
				initial = {
					id: room.id ?? '',
					name: room.name ?? '',
					color: room.color ?? '',
					location: room.location ?? '',
					household: room.household ?? '',
					description: room.description ?? '',
				};
			}
		})
	});

	function handleEdit(detail: Omit<Room, 'id'>) {
		rooms.updateRoom({ id, ...detail });
		goto('/rooms');
	}
</script>

<svelte:head>
	<title>Edit Room</title>
</svelte:head>

<main class="container mx-auto px-4 py-6">
	<Title title="Edit room"/>
	{#if initial}
		<RoomForm
			{initial}
			submitLabel="Save Changes"
			onSubmit={handleEdit}
		>
			{#snippet otherButtons()}
				<button
					type="button"
					class="mt-2 me-8 p-3 rounded-lg border-red-300 bg-red-100 text-red-600 font-bold hover:bg-red-200 transition-colors"
				><Trash/></button>
			{/snippet}
		</RoomForm>
	{/if}
</main>
