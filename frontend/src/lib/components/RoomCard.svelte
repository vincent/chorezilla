<script lang="ts">
	import { shadow_hover } from "$lib/styles.svelte";
	import { Users } from "@lucide/svelte";
	import RoomIcon from "./icons/RoomIcon.svelte";

	let { room } = $props()
</script>

<a href={"/rooms/" + room.id + "/chores"} class="room-card bg-white dark:bg-gray-700 rounded-xl shadow overflow-hidden {shadow_hover}">
	<div class={`h-20 px-5 flex items-center justify-start relative bg-${room.iconColor}-100`}>
		<div class="flex flex-col flex-grow justify-between items-start mb-2">
			<h3 class="font-bold text-lg text-gray-800">{room.title}</h3>
			<!-- Placeholder for chores count -->
			<span class="px-2 py-1 bg-indigo-100 text-indigo-600 text-xs rounded-full">0 chores</span>
		</div>
		<RoomIcon className={`text-${room.iconColor}-600`} icon={room.icon as any} />
	</div>
	<div class="p-4">
		<p class="text-gray-600 dark:text-gray-300 text-sm mb-3">{room.description}</p>
		<div class="flex items-center text-sm text-gray-500 dark:text-gray-300">
			<Users class="w-4 h-4 mr-1"/>
			<span>0 members</span>
		</div>
	</div>
</a>
