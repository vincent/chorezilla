<script lang="ts">
	import { shadow_hover } from '$lib/styles.svelte';
	import Card from './Card.svelte';
	import RoomIcon from './icons/RoomIcon.svelte';

	let { title, chores, subtitle = undefined } = $props();
</script>

<section class="mb-8">
	<div class="flex justify-between items-center mb-4">
		<h2 class="text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>
		{@render subtitle?.()}
	</div>
	
	<div class="space-y-3">
		{#each chores as chore}
			<Card
				title={chore.title}
				href={`/chores/${chore.id}`}
				subtitle={`${chore.location} • ${chore.due}`}
			>
				{#snippet icon()}
					<div class={`p-3 rounded-full bg-${chore.iconColor}-100 text-${chore.iconColor}-600`}>
						<RoomIcon icon="bathtub"/>
					</div>
				{/snippet}
			</Card>
		{/each}
	</div>
</section>
