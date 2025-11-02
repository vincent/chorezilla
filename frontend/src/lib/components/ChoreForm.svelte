<script lang="ts">
	import { input_class, select_class } from '$lib/styles.svelte';
	import { members } from '$lib/stores/members';
	import { rooms } from '$lib/stores/rooms';
	import Field from './Field.svelte';
	import Form from './Form.svelte';
	import { icons } from './icons';
	import Dropdown from './Dropdown.svelte';
	import ChoreIcon from './ChoreIcon.svelte';

	let {
		initial = {
			name: '',
			room: '',
			icon: 'cardboard-box-12',
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
	let isDropdownOpen = $state(false);

	function selectIcon(i: string) {
		icon = i;
		isDropdownOpen = false;
	}

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
	<div class="flex position-relative chore-form">
		<Dropdown bind:isDropdownOpen>
			{#snippet button()}
				<ChoreIcon className="me-2 text-slate-900 dark:text-white" icon={icon} />
			{/snippet}
			{#snippet menu()}
				{#each icons as i}
					<li class="my-4 text-lg">
						<button type="button" class="btn flex items-center cursor-pointer" onclick={() => selectIcon(i)}>
							<ChoreIcon className="text-slate-900 dark:text-gray-500" icon={i} />
						</button>
					</li>
				{/each}
			{/snippet}
		</Dropdown>
		<input placeholder="Chore's title" bind:value={name} required class="{input_class} flex-grow text-xl p-4" />
	</div>
	<Field label="Description">
		<textarea placeholder="Optional description about this task" bind:value={description} class={input_class}
		></textarea>
	</Field>
	<Field label="Location">
		<select bind:value={room} class={select_class}>
			<option class="placeholder" value="" disabled hidden>Select a room</option>
			{#each $rooms as r (r.id)}
				<option value={r.id}>{r.name}</option>
			{/each}
		</select>
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

<style>
	.chore-form :global(.dropdown-content.menu) {
		display: grid;
		width: 60svw;
		max-width: 60svw;
		grid-template-rows: repeat(2, auto);
		grid-template-columns: repeat(4, auto);
	}
</style>