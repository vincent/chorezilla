<script lang="ts">
	import PersonForm from '$lib/components/PersonForm.svelte';
	import { people, type Person } from '$lib/stores/people';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import Title from '$lib/components/Title.svelte';

	let person: Person | undefined;

	onMount(() => {
		if (!page.params.id) return;
		person = people.findPerson(page.params.id);
	});

	function handleSubmit(event: CustomEvent<Omit<Person, 'id'>>) {
		const updated: Person = { ...event.detail, id: String(page.params.id) };
		people.updatePerson(updated);
		goto('/people');
	}
</script>

<main class="container mx-auto px-4 py-6">
	<Title title="Edit Person"/>
	{#if person}
		<PersonForm
			initial={{
				name: person.name,
				role: person.role ?? '',
				choresCompleted: person.choresCompleted ?? 0,
				avatarColor: person.avatarColor ?? ''
			}}
			submitLabel="Save Changes"
			onSubmit={handleSubmit}
		>
			{#snippet otherButtons()}
				<button
					type="button"
					class="me-8 mt-2 p-3 rounded-lg border-red-300 bg-red-100 text-red-600 font-bold hover:bg-red-200 transition-colors"
					>Remove person</button
				>
			{/snippet}
		</PersonForm>
	{:else}
		<section class="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
			<h1 class="text-xl font-bold text-gray-800">Person not found</h1>
			<p class="text-gray-500">No details available for this person.</p>
		</section>
	{/if}
</main>
