<script lang="ts">
	import WelcomeSection from '$lib/components/WelcomeSection.svelte';
	import StatsSection from '$lib/components/StatsSection.svelte';
	import ChoresSection from '$lib/components/ChoresSection.svelte';

	import { chores } from '$lib/stores/chores';
	import { authModel, client } from '$lib/pocketbase';
</script>

<!-- Main Content -->
<main class="container mx-auto px-4 py-6">

	<WelcomeSection user={client.authStore.record} />
	<StatsSection />

	<ChoresSection title="Today's Chores" chores={$chores} />
</main>
