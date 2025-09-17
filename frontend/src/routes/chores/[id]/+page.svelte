<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Title from '$lib/components/Title.svelte';
	import { client } from '$lib/pocketbase';
	import type { ChoresRecord } from '$lib/pocketbase/generated-types';
	import { isAdmin } from '$lib/stores/auth';
	import { chores } from '$lib/stores/chores';
	import { onMount } from 'svelte';

	let id = page.params.id;
	let chore: ChoresRecord | undefined;

	onMount(() => {
		if (!id) return;
		chores.loadCollection().then(() => {
			chore = chores.findChore(id);
		});
	});

	function handleDone() {
		chores
			.updateChore({
				...chore,
				last_completed: new Date().toISOString(),
				last_completed_by: client.authStore.record?.id
			} as ChoresRecord)
			.then(() => goto('/'));
	}
</script>

<svelte:head>
	{#if chore}
		<title>ChoreZilla | {chore.name}</title>
	{/if}
</svelte:head>

{#if chore}
	<section class="max-w-xl mx-auto mt-8 p-6 bg-white dark:bg-gray-700 rounded-xl shadow">
		<Title title={chore.name} />
		<p class="text-gray-500 mb-1">{(chore as any).expand.room.name} • {chore.frequency}</p>
		<p class="text-gray-700 mt-4">{chore.description}</p>

		<div class="flex justify-between">
			<button
				type="button"
				onclick={handleDone}
				class="mt-2 p-3 rounded-lg border-green-300 bg-green-100 text-green-600 font-bold hover:bg-green-200 transition-colors cursor-pointer"
				>Mark as done</button
			>
			{#if $isAdmin}
				<a
					href={`/chores/${chore.id}/edit`}
					class="mt-2 p-3 rounded-lg border-indigo-300 bg-indigo-100 text-indigo-600 font-bold hover:bg-indigo-200 transition-colors"
					>Edit</a
				>
			{/if}
		</div>
	</section>
{:else}
	<section class="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
		<h1 class="text-xl font-bold text-gray-800">Chore not found</h1>
		<p class="text-gray-500">No details available for this chore.</p>
	</section>
{/if}
