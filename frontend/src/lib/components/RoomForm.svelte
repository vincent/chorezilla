<script lang="ts">
	import { palette } from "$lib/styles.svelte";
	import Field from "./Field.svelte";
	import Form from "./Form.svelte";
	import { icons } from "./icons";
	import RoomIcon from "./icons/RoomIcon.svelte";

	let {
		initial = {
			title: '',
			location: '',
			description: '',
			icon: '',
			iconColor: ''
		},
		submitLabel = 'Submit',
		onSubmit,
		otherButtons = undefined,
	} = $props();

	let title = $state(initial.title);
	let location = $state(initial.location);
	let description = $state(initial.description);
	let icon = $state(initial.icon);
	let iconColor = $state(initial.iconColor);

	function handleSubmit(event: Event) {
		event.preventDefault();
		onSubmit?.({
			title,
			location,
			description: description || undefined,
			icon: icon || undefined,
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
	<Field label="Icon">
		<div class="flex">
			<select
				class="mt-1 p-2 rounded-lg border border-gray-300 flex-grow dark:bg-gray-800"
				bind:value={icon}
			>
				{#each Object.keys(icons) as c}
					<option value={c}>{c}</option>
				{/each}
			</select>
			{#if icon}
				<RoomIcon className="ms-2 text-gray-500" {icon} />
			{/if}
		</div>
	</Field>
	<Field label="Color">
		<select
			class="mt-1 p-2 rounded-lg border border-gray-300 bg-{iconColor}-100 text-{iconColor}-600"
			bind:value={iconColor}
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
