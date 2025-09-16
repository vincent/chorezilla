<script lang="ts">
	import WelcomeSection from '$lib/components/WelcomeSection.svelte';
	import StatsSection from '$lib/components/StatsSection.svelte';
	import ChoresSection from '$lib/components/ChoresSection.svelte';
	import { chores, completedChores, dueChores } from '$lib/stores/chores';
	import { client } from '$lib/pocketbase';

	chores.loadCollection()
</script>

<svelte:head>
	<title>ChoreZilla | Today's Chores</title>
</svelte:head>

<!-- Main Content -->
<main class="container mx-auto px-4 py-6">

	<WelcomeSection user={client.authStore.record} pending={$dueChores.length} />
	<StatsSection pending={$dueChores.length} completed={$completedChores.length} />

	<ChoresSection title="Today's Chores" chores={$dueChores} />
</main>
