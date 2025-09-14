<script lang="ts">
	import { rooms } from "$lib/stores/rooms";
	import { get } from "svelte/store";
	import Field from "./Field.svelte";
	import Form from "./Form.svelte";

	let {
		initial = {
			title: '',
			roomId: '',
			due: '',
			description: '',
			iconColor: ''
		},
		submitLabel = 'Submit',
		onSubmit,
		otherButtons = undefined,
	} = $props();

	// For two-way binding in the form
	let title = $state(initial.title);
	let roomId = $state(initial.roomId);
	let description = $state(initial.description);
	let iconColor = $state(initial.iconColor);
	let roomsList = get(rooms)

	function handleSubmit(event: Event) {
		event.preventDefault();
		onSubmit?.({
			title,
			roomId,
			description: description || undefined,
			iconColor: iconColor || undefined
		});
	}
</script>

<Form onSubmit={handleSubmit} {submitLabel}>
	<Field label="Title">
		<input
			bind:value={title}
			required
			class="mt-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800"
		/>
	</Field>
	<Field label="Location">
		<select
			bind:value={roomId}
			class="mt-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800"
		>
			{#each roomsList as r}
				<option value={r.id}>{r.title}</option>
			{/each}
		</select>
	</Field>
	<Field label="Description">
		<textarea
			bind:value={description}
			class="mt-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800"
		/>
	</Field>

	{#snippet altButtons()}
		{@render otherButtons?.()}	
	{/snippet}
</Form>
