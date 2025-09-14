<script lang="ts">
	import ChoresSection from "$lib/components/ChoresSection.svelte";
    import { page } from "$app/state";
	import { chores } from "$lib/stores/chores";
	import { rooms } from "$lib/stores/rooms";

    let roomId = String(page.params.id)
    let room = rooms.findRoom(roomId)
    let roomChores = chores.findChoresByRoomId(roomId)
</script>

<!-- Main Content -->
<main class="container mx-auto px-4 py-6">
    <ChoresSection title={`Chores in ${room?.title}`} chores={roomChores}>
        {#snippet subtitle()}
            <a class="text-gray-500 dark:text-gray-400" href={`/rooms/${room?.id}/edit`}>edit room</a>
        {/snippet}
    </ChoresSection>
</main>