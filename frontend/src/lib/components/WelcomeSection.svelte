<script lang="ts">
	import type { AuthRecord } from "pocketbase";

	let { user }: { user: AuthRecord } = $props();
</script>

<section class="mb-8">
	<h2 class="text-2xl font-bold text-gray-800 mb-2 dark:text-white">Welcome back, {user?.username}!</h2>
	<p class="text-gray-600 dark:text-gray-400">You have 3 chores to complete today</p>
</section>
