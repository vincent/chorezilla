<script lang="ts">
	import { input_class, select_class } from '$lib/styles.svelte';
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
			<input
				type="email"
				placeholder="Member email"
				bind:value={email}
				required
				class={input_class}
			/>
		</Field>
	{/if}
	<Field label="Name">
		<input placeholder="Member name" bind:value={name} required class={input_class} />
	</Field>
	<Field label="Role">
		<select bind:value={role} class={select_class}>
			<option class="placeholder" value="" disabled hidden>Select a role</option>
			<option value="user">Regular user (cannot edit chores, members)</option>
			<option value="admin">Administrator</option>
		</select>
	</Field>

	{#snippet altButtons()}
		{@render otherButtons?.()}
	{/snippet}
</Form>
