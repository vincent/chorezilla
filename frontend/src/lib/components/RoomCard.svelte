<script lang="ts">
	import type { RoomsRecord } from '$lib/pocketbase/generated-types.js';
	import { shadow_hover } from '$lib/styles.svelte';
	import { Users } from '@lucide/svelte';

	let { room, members }: { room: RoomsRecord, members: number } = $props();
</script>

<a
	href={'/rooms/' + room.id + '/chores'}
	class="room-card bg-white dark:bg-gray-700 rounded-xl shadow overflow-hidden {shadow_hover}"
>
	<div class={`h-20 px-5 flex items-center justify-start relative bg-${room.color}-100`}>
		<div class="flex flex-col flex-grow justify-between items-start mb-2">
			<h3 class="font-bold text-lg text-gray-800">{room.name}</h3>
			<!-- Placeholder for chores count -->
			<span class="px-2 py-1 bg-indigo-200 text-indigo-600 text-xs rounded-full"
				>{(room as any).expand?.chores_via_room?.length ?? 0} chores</span
			>
		</div>
	</div>
	<div class="p-4">
		<p class="text-gray-600 dark:text-gray-300 text-sm mb-3">{room.description}</p>
		<div class="flex items-center text-sm text-gray-500 dark:text-gray-300">
			<Users class="w-4 h-4 mr-1" />
			<span>{members} members</span>
		</div>
	</div>
</a>
