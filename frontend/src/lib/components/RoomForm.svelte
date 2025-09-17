<script lang="ts">
	import { input_class, palette } from '$lib/styles.svelte';
	import Field from './Field.svelte';
	import Form from './Form.svelte';

	let {
		initial = {
			name: '',
			location: '',
			description: '',
			color: ''
		},
		submitLabel = 'Submit',
		onSubmit,
		otherButtons = undefined
	} = $props();

	let name = $state(initial.name);
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
		<input bind:value={name} required class={input_class} />
	</Field>
	<Field label="Location">
		<input bind:value={location} class={input_class} />
	</Field>
	<Field label="Description">
		<textarea bind:value={description} class={input_class}></textarea>
	</Field>
	<Field label="Color">
		<select
			class="mt-1 p-2 rounded-lg border border-gray-300 bg-{color}-100 text-{color}-600"
			bind:value={color}
		>
			{#each palette as c (c)}
				<option value={c}>{c}</option>
			{/each}
		</select>
	</Field>

	{#snippet altButtons()}
		{@render otherButtons?.()}
	{/snippet}
</Form>
