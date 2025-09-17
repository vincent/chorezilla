<script lang="ts">
	import { type HouseholdsRecord } from '../pocketbase/generated-types';
	import DinosaurIcon from './icons/DinosaurIcon.svelte';

	let { household }: { household: HouseholdsRecord } = $props();
</script>

<header class="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm">
	<div class="container mx-auto px-4 py-4 flex justify-between items-center">
		<div class="text-xl font-bold text-gray-800 dark:text-gray-400">
			<a href="/">{household?.name}</a>
		</div>
		<div class="flex items-center space-x-2">
			<h1 class="text-xl font-bold text-gray-800 dark:text-gray-400"><a href="/">ChoreZilla</a></h1>
			<DinosaurIcon className="text-white" />
		</div>
	</div>
</header>
