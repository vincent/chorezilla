<script lang="ts">
	import { palette } from "$lib/styles.svelte";
	import Field from "./Field.svelte";
	import Form from "./Form.svelte";
	import { icons } from "./icons";
	import RoomIcon from "./icons/RoomIcon.svelte";

	let {
		initial = {
			name: '',
			location: '',
			description: '',
			color: ''
		},
		submitLabel = 'Submit',
		onSubmit,
		otherButtons = undefined,
	} = $props();

	let name = $state(initial.name);
	let icon = $state(initial.icon);
	let location = $state(initial.location);
	let color = $state(initial.icon_color);
	let description = $state(initial.description);

	function handleSubmit(event: Event) {
		event.preventDefault();
		onSubmit?.({
			name,
			location,
			description: description || undefined,
			color: color || undefined
		});
	}
</script>

<Form onSubmit={handleSubmit} {submitLabel}>
	<Field label="Name">
		<input
			bind:value={name}
			required
			class="mt-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800"
		/>
	</Field>
	<Field label="Location">
		<input
			bind:value={location}
			class="mt-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800"
		/>
	</Field>
	<Field label="Description">
		<textarea
			bind:value={description}
			class="mt-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800"
		></textarea>
	</Field>
	<Field label="Color">
		<select
			class="mt-1 p-2 rounded-lg border border-gray-300 bg-{color}-100 text-{color}-600"
			bind:value={color}
		>
			{#each palette as c}
				<option value={c}>{c}</option>
			{/each}
		</select>
	</Field>

	{#snippet altButtons()}
		{@render otherButtons?.()}	
	{/snippet}
</Form>
