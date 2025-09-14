<script lang="ts">
	import { palette } from "$lib/styles.svelte";
	import Field from "./Field.svelte";
	import Form from "./Form.svelte";

	let {
		initial = {
			title: '',
			location: '',
			due: '',
			description: '',
			icon: '',
			iconBg: '',
			iconColor: ''
		},
		submitLabel = 'Submit',
		onSubmit,
		otherButtons = undefined,
	} = $props();

	let name = $state(initial.name);
	let role = $state(initial.role);
	let avatarColor = $state(initial.avatarColor);

	function handleSubmit(event: Event) {
		event.preventDefault();
		onSubmit?.({
			name,
			role: role || undefined,
			avatarColor: avatarColor || undefined
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
	<Field label="Role">
		<input
			bind:value={role}
			placeholder="e.g. Roommate"
			class="mt-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800"
		/>
	</Field>
	<Field label="Avatar Color">
		<select
			class="mt-1 p-2 rounded-lg border border-gray-300 bg-{avatarColor}-100 text-{avatarColor}-600"
			bind:value={avatarColor}
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
