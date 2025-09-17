<script lang="ts">
	import { input_class } from '$lib/styles.svelte';
	import Field from './Field.svelte';
	import Form from './Form.svelte';

	let {
		initial = {
			name: ''
		},
		submitLabel = 'Submit',
		onSubmit,
		otherButtons = undefined
	} = $props();

	let name = $state(initial.name);

	function handleSubmit(event: Event) {
		event.preventDefault();
		onSubmit?.({
			name
		});
	}
</script>

<Form onSubmit={handleSubmit} {submitLabel}>
	<Field label="Name">
		<input placeholder="ie: Home, Beach house" bind:value={name} required class={input_class} />
	</Field>

	{#snippet altButtons()}
		{@render otherButtons?.()}
	{/snippet}
</Form>
