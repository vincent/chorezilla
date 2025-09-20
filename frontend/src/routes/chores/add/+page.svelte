<script lang="ts">
	import { goto } from '$app/navigation';
	import { chores } from '$lib/stores/chores';
	import ChoreForm from '$lib/components/ChoreForm.svelte';
	import Title from '$lib/components/Title.svelte';
	import { currentHousehold } from '$lib/stores/households';
	import { type Chore } from '$lib/models';

	function handleAdd(event: Omit<Chore, 'id'>) {
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
