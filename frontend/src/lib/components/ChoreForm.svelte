<script lang="ts">
	import { input_class, select_class } from '$lib/styles.svelte';
	import RoomIcon from './icons/RoomIcon.svelte';
	import { members } from '$lib/stores/members';
	import { rooms } from '$lib/stores/rooms';
	import Field from './Field.svelte';
	import Form from './Form.svelte';
	import { icons } from './icons';

	let {
		initial = {
			name: '',
			room: '',
			icon: '',
			assigned_users: [],
			starts_at: new Date(),
			frequency: 'weekly',
			description: ''
		},
		submitLabel = 'Submit',
		onSubmit,
		otherButtons = undefined
	} = $props();

	// For two-way binding in the form
	let name = $state(initial.name);
	let room = $state(initial.room);
	let icon = $state(initial.icon);
	let starts_at = $state(
		initial.starts_at?.toISOString ? initial.starts_at.toISOString()?.split(' ')[0] : null
	);
	let assigned_users = $state(initial.assigned_users);
	let frequency = $state(initial.frequency);
	let description = $state(initial.description);

	function handleSubmit(event: Event) {
		event.preventDefault();
		onSubmit?.({
			name,
			room,
			icon,
			starts_at,
			frequency,
			assigned_users: assigned_users || undefined,
			description: description || undefined
		});
	}
</script>

<Form onSubmit={handleSubmit} {submitLabel}>
	<Field label="Title">
		<input placeholder="Chore's title" bind:value={name} required class={input_class} />
	</Field>
	<Field label="Location">
		<select bind:value={room} class={select_class}>
			<option class="placeholder" value="" disabled hidden>Select a room</option>
			{#each $rooms as r (r.id)}
				<option value={r.id}>{r.name}</option>
			{/each}
		</select>
	</Field>
	<Field label="Description">
		<textarea placeholder="More infos about the task" bind:value={description} class={input_class}
		></textarea>
	</Field>
	<Field label="Starting at">
		<input bind:value={starts_at} type="date" class={input_class} />
	</Field>
	<Field label="Frequency">
		<select bind:value={frequency} class={input_class}>
			<option class="placeholder" value="" disabled hidden>Select a frequency</option>
			<option value="hourly">Hourly</option>
			<option value="daily">Daily</option>
			<option value="weekly">Weekly</option>
			<option value="monthly">Monthly</option>
			<option value="yearly">Yearly</option>
		</select>
	</Field>
	<Field label="Icon">
		<div class="flex">
			<select class={select_class} bind:value={icon}>
				<option class="placeholder" value="" disabled hidden>Select an icon</option>
				{#each Object.keys(icons) as c (c)}
					<option value={c}>{c}</option>
				{/each}
			</select>
			{#if icon}
				<RoomIcon className="ms-2 text-gray-500" {icon} />
			{/if}
		</div>
	</Field>
	<Field label="Assigned">
		{#each $members as p (p.memberId)}
			<label class="flex items-center ms-5 m-3"
				><input type="checkbox" class="me-3 h-5 w-5" value={p.userId} bind:group={assigned_users} />
				{p.name}</label
			>
		{/each}
	</Field>

	{#snippet altButtons()}
		{@render otherButtons?.()}
	{/snippet}
</Form>
