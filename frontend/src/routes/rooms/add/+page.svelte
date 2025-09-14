<script lang="ts">
  import { goto } from '$app/navigation';
  import { rooms } from '$lib/stores/rooms';
  import RoomForm from '$lib/components/RoomForm.svelte';
  import type { Room } from '$lib/models/room';
	import Title from '$lib/components/Title.svelte';

  function handleAdd(_type: string, detail: Omit<Room, 'id'>) {
    const { title, location, description, icon, iconBg, iconColor } = detail;
    const newRoom: Room = {
      id: Date.now().toString(),
      title,
      location,
      description,
      icon,
      iconBg,
      iconColor
    };
    rooms.addRoom(newRoom);
    goto('/rooms');
  }
</script>

<svelte:head>
	<title>Add Room</title>
</svelte:head>

<main class="container mx-auto px-4 py-6">
	<Title title="Add a new room"/>
  <RoomForm
    submitLabel="Add Room"
    onSubmit={handleAdd}
  />
</main>
