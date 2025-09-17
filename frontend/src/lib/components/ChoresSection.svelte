<script lang="ts">
	import type { ChoresRecord } from '$lib/pocketbase/generated-types';
	import RoomIcon from './icons/RoomIcon.svelte';
	import type { Snippet } from 'svelte';
	import Card from './Card.svelte';

	let {
		title,
		chores,
		subtitle,
		empty
	}: {
		title: string;
		chores: ChoresRecord[];
		subtitle?: Snippet;
		empty?: Snippet;
	} = $props();
</script>

<section class="mb-8">
	<div class="flex justify-between items-center mb-4">
		<h2 class="text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>
		{@render subtitle?.()}
	</div>

	<div class="space-y-3">
		{#each chores as chore (chore.id)}
			<Card
				title={chore.name}
				href={`/chores/${chore.id}`}
				subtitle={`${(chore as any).expand.room.name} • ${chore.frequency}`}
			>
				{#snippet icon()}
					<div class={`p-3 rounded-full bg-${(chore as any).expand.room.color}-100 text-grey-600`}>
						<RoomIcon icon={chore.icon as any} />
					</div>
				{/snippet}
				{#snippet infos()}
					{#if chore.last_completed}
						<p class="text-end font-medium text-gray-800 dark:text-gray-100">last completed</p>
						<p class="text-end text-sm text-gray-500 dark:text-gray-400">{Intl.DateTimeFormat('en').format(Date.parse(chore.last_completed))}</p>
					{/if}
				{/snippet}
			</Card>
		{:else}
			{@render empty?.()}
		{/each}
	</div>
</section>
