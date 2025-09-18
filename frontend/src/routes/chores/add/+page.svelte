<script lang="ts">
	import { goto } from '$app/navigation';
	import { chores } from '$lib/stores/chores';
	import ChoreForm from '$lib/components/ChoreForm.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { ChoresRecord } from '$lib/pocketbase/generated-types';
	import { currentHousehold } from '$lib/stores/households';
	import { onMount } from 'svelte';
	import { members } from '$lib/stores/members';
	import { rooms } from '$lib/stores/rooms';

	onMount(() => {
		members.loadCollection();
		rooms.loadCollection();
	});

	function handleAdd(event: Omit<ChoresRecord, 'id'>) {
		const { name, room, icon, description, starts_at, frequency, assigned_users } = event;
		chores
			.addChore({
				household: $currentHousehold.id,
				assigned_users,
				frequency,
				icon,
				name,
				room,
				starts_at,
				description
			})
			.then((c) => goto(`/chores/${c.id}`));
	}
</script>

<svelte:head>
	<title>ChoreZilla | Add Chore</title>
</svelte:head>

<main class="container mx-auto px-4 py-6">
	<Title title="Add a new Chore" />
	<ChoreForm submitLabel="Add Chore" onSubmit={handleAdd} />
</main>
