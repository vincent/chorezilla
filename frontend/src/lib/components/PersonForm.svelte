<script lang="ts">
	import { input_class } from '$lib/styles.svelte';
	import Field from './Field.svelte';
	import Form from './Form.svelte';

	let {
		useEmail = false,
		initial = {
			email: '',
			name: '',
			role: ''
		},
		submitLabel = 'Submit',
		onSubmit,
		otherButtons = undefined
	} = $props();

	let email = $state(initial.email);
	let name = $state(initial.name);
	let role = $state(initial.role);

	function handleSubmit(event: Event) {
		event.preventDefault();
		onSubmit?.({
			email: email || 'Unknown',
			name: name || 'Unknown',
			role: role || ''
		});
	}
</script>

<Form onSubmit={handleSubmit} {submitLabel}>
	{#if useEmail}
		<Field label="Email">
			<input bind:value={email} required class={input_class} />
		</Field>
	{:else}
		<Field label="Name">
			<input bind:value={name} required class={input_class} />
		</Field>
	{/if}
	<Field label="Role">
		<input bind:value={role} placeholder="e.g. Roommate" class={input_class} />
	</Field>

	{#snippet altButtons()}
		{@render otherButtons?.()}
	{/snippet}
</Form>
