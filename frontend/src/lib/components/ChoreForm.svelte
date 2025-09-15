<script lang="ts">
	import { rooms } from "$lib/stores/rooms";
	import { get } from "svelte/store";
	import Field from "./Field.svelte";
	import Form from "./Form.svelte";
	import { onMount } from "svelte";
	import { people } from "$lib/stores/people";
	import { icons } from "./icons";
	import RoomIcon from "./icons/RoomIcon.svelte";

	let {
		initial = {
			name: '',
			room: '',
			icon: 'badge',
			assigned_users: [],
			frequency: 'weekly',
			description: '',
		},
		submitLabel = 'Submit',
		onSubmit,
		otherButtons = undefined,
	} = $props();

	// For two-way binding in the form
	let name = $state(initial.name);
	let room = $state(initial.room);
	let icon = $state(initial.icon);
	let assigned_users = $state(initial.assigned_users);
	let frequency = $state(initial.frequency);
	let description = $state(initial.description);

	function handleSubmit(event: Event) {
		event.preventDefault();
		onSubmit?.({
			name,
			room,
			icon,
			frequency,
			assigned_users: assigned_users || undefined,
			description: description || undefined,
		});
	}
</script>

<Form onSubmit={handleSubmit} {submitLabel}>
	<Field label="Title">
		<input
			bind:value={name}
			required
			class="mt-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800"
		/>
	</Field>
	<Field label="Location">
		<select
			bind:value={room}
			class="mt-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800"
		>
			{#each $rooms as r}
				<option value={r.id}>{r.name}</option>
			{/each}
		</select>
	</Field>
	<Field label="Description">
		<textarea
			bind:value={description}
			class="mt-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800"
		/>
	</Field>
	<Field label="Frequency">
		<select
			bind:value={frequency}
			class="mt-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800"
		>
			<option value="hourly">Hourly</option>
			<option value="daily">Daily</option>
			<option value="weekly">Weekly</option>
			<option value="monthly">Monthly</option>
			<option value="yearly">Yearly</option>
		</select>
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
	<Field label="Assigned">
		{#each $people as p}
			<label class="flex items-center ms-5 m-3"><input type="checkbox" class="me-3 h-5 w-5" value={p.userId} bind:group={assigned_users} /> {p.name}</label>
		{/each}
	</Field>

	{#snippet altButtons()}
		{@render otherButtons?.()}	
	{/snippet}
</Form>
