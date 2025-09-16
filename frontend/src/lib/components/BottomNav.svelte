<script lang="ts">
	import { isAdmin } from "$lib/stores/auth";
	import { CalendarCheck, House, PlusIcon, Settings2, Users } from "@lucide/svelte";

	let { active } = $props()
</script>

<!-- Bottom Navigation -->
<nav class="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
	<div class="container mx-auto px-4">
		<div class="flex justify-around py-3">
			<a href="/" aria-label="Home" class="p-2 text-gray-500" class:text-indigo-600={active === '/'}>
				<CalendarCheck class="w-6 h-6"/>
			</a>
			<a href="/rooms" aria-label="Rooms" class="p-2 text-gray-500" class:text-indigo-600={active === '/rooms'}>
				<House class="w-6 h-6"/>
			</a>
			{#if $isAdmin}
				<a href="/chores/add" aria-label="New chore" class="p-2 pt-[20px] bg-indigo-600 text-white rounded-full -mt-6 shadow-lg p-4">
					<PlusIcon class="w-6 h-6"/>
				</a>
			{/if}
			<a href="/members" aria-label="People" class="p-2 text-gray-500" class:text-indigo-600={active === '/members'}>
				<Users class="w-6 h-6"/>
			</a>
			<a href="/settings" aria-label="Settings" class="p-2 text-gray-500" class:text-indigo-600={active === '/settings'}>
				<Settings2 class="w-6 h-6"/>
			</a>
		</div>
	</div>
</nav>
