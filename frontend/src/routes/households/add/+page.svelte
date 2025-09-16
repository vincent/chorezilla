<script lang="ts">
	import { goto } from '$app/navigation';
	import Title from '$lib/components/Title.svelte';
	import { households } from '$lib/stores/households';
	import type { RoomsRecord } from '$lib/pocketbase/generated-types';
	import HouseholdForm from '$lib/components/HouseholdForm.svelte';

	function handleAdd(detail: Omit<RoomsRecord, 'id'>) {
		const { name } = detail;
		households.create(name).then(() => goto('/'));
	}
</script>

<svelte:head>
	<title>ChoreZilla | Add household</title>
</svelte:head>

<main class="container mx-auto px-4 py-6">
	<Title title="Add a new household" />
	<HouseholdForm submitLabel="Create" onSubmit={handleAdd} />
</main>
