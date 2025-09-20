<script lang="ts">
	import { chores, completedChores, dueChores } from '$lib/stores/chores';
	import WelcomeSection from '$lib/components/WelcomeSection.svelte';
	import ChoresSection from '$lib/components/ChoresSection.svelte';
	import StatsSection from '$lib/components/StatsSection.svelte';
	import { currentHousehold } from '$lib/stores/households';
	import { button_class } from '$lib/styles.svelte';
	import { client } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { ThumbsUp } from '@lucide/svelte';

	chores.loadCollection();
</script>

<svelte:head>
	<title>ChoreZilla | Today's Chores</title>
</svelte:head>

<!-- Main Content -->
<main class="container mx-auto px-4 py-6">
	<WelcomeSection user={client.authStore.record} pending={$dueChores.length} />

	{#if $currentHousehold}
		<StatsSection pending={$dueChores.length} completed={$completedChores.length} />

		<ChoresSection title="Today's Chores" chores={$dueChores}>
			{#snippet empty()}
				{#if !$chores.length}
					<button onclick={() => goto('/chores/add')} class="w-full {button_class}" type="button"
						>Create your first chore</button
					>
				{:else}
					<div class="flex px-4 my-8 mx-auto justify-center text-xl text-gray-500">
						<span>All done ! Good job</span>
						<ThumbsUp class="ms-3" />
					</div>
				{/if}
			{/snippet}
		</ChoresSection>
	{:else}
		<button onclick={() => goto('/households/add')} class="w-full {button_class}" type="button"
			>Create your first place</button
		>
	{/if}
</main>
