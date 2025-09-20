<script lang="ts">
	import PersonForm from '$lib/components/PersonForm.svelte';
	import { members, type Person } from '$lib/stores/members';
	import Title from '$lib/components/Title.svelte';
	import { goto } from '$app/navigation';
	import { Trash } from '@lucide/svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let id = '';
	let person: Person | undefined;

	onMount(() => {
		id = String(page.params.id);
		if (!id) return;
		members.loadCollection().then(() => {
			person = members.findByUserId(id);
		});
	});

	function handleSubmit(person: Person) {
		members.updatePerson(person).then(() => goto('/members'));
	}
</script>

<svelte:head>
	{#if person}
		<title>ChoreZilla | {person.name}</title>
	{/if}
</svelte:head>

<main class="container mx-auto px-4 py-6">
	<Title title="Edit Person" />
	{#if person}
		<PersonForm
			initial={{
				userId: person.userId,
				memberId: person.memberId,
				name: person.name,
				email: person.email,
				role: person.role ?? '',
				choresCompleted: person.choresCompleted ?? 0
			}}
			submitLabel="Save Changes"
			onSubmit={handleSubmit}
		>
			{#snippet otherButtons()}
				<button
					type="button"
					class="me-8 mt-2 p-3 rounded-lg border-red-300 bg-red-100 text-red-600 font-bold hover:bg-red-200 transition-colors"
					><Trash /></button
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
