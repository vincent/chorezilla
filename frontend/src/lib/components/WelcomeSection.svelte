<script lang="ts">
	import type { User } from '$lib/models';

	let { user, pending }: { user: User; pending: number } = $props();
</script>

<section class="mb-8">
	<h2 class="text-2xl font-bold text-gray-800 mb-2 dark:text-white">
		Welcome back, {user?.name}!
	</h2>
	{#if pending > 0}
		<p class="text-gray-600 dark:text-gray-400">You have {pending} chores to complete today</p>
	{/if}
</section>
