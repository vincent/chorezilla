<script lang="ts">
	import { Dot, House, HousePlus } from '@lucide/svelte';
	import DinosaurIcon from './icons/DinosaurIcon.svelte';
	import type { Household } from '$lib/models';
	import Dropdown from './Dropdown.svelte';

	let {
		active = undefined,
		households = [],
		setActive = undefined
	}: {
		active?: Household;
		households: Household[];
		setActive?: (h: Household) => void;
	} = $props();

	let isDropdownOpen = $state(false);

	function selectItem(h: Household) {
		isDropdownOpen = false;
		setActive?.(h);
	}
</script>

<header class="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm">
	<div class="container mx-auto px-4 py-4 flex justify-between items-center">
		<Dropdown bind:isDropdownOpen>
			{#snippet button()}
				<div
					class="flex items-center text-xl font-bold text-gray-800 dark:text-gray-400 cursor-pointer"
				>
					<House class="me-3" />
					{active?.name}
				</div>
			{/snippet}
			{#snippet menu()}
				{#each households as h (h.id)}
					<li class="my-4 text-lg">
						{#if h.id === active?.id}
							<button
								class="btn flex items-center text-slate-900 dark:text-slate-200 cursor-pointer"
							>
								<House class="me-3" />
								{h.name}
							</button>
						{:else}
							<button
								class="btn flex items-center text-slate-400 cursor-pointer"
								onclick={() => selectItem(h)}><Dot class="me-3" /> {h.name}</button
							>
						{/if}
					</li>
				{/each}
				<li class="my-4 text-lg">
					<a href="/households/add" class="btn flex items-center text-slate-500"
						><HousePlus class="me-3" /> New household</a
					>
				</li>
			{/snippet}
		</Dropdown>
		<div class="flex items-center space-x-2">
			<h1 class="text-xl font-bold text-gray-800 dark:text-gray-400"><a href="/">ChoreZilla</a></h1>
			<DinosaurIcon className="text-gray-800 dark:text-gray-400" />
		</div>
	</div>
</header>
