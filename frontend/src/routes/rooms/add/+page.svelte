<script lang="ts">
  import { goto } from '$app/navigation';
  import { rooms } from '$lib/stores/rooms';
  import RoomForm from '$lib/components/RoomForm.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { RoomsRecord } from '$lib/pocketbase/generated-types';
	import { currentHousehold } from '$lib/stores/households';

  function handleAdd(detail: Omit<RoomsRecord, 'id'>) {
    const { name, location, description, icon, icon_color } = detail;
    rooms
      .addRoom({
        household: $currentHousehold.id,
        description,
        icon_color,
        location,
        name,
        icon,
      })
      .then(() => goto('/rooms'));
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
