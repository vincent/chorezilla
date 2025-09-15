<script>
	import { Check, Clock } from "@lucide/svelte";

	let { pending, completed } = $props()

</script>
<div class="grid grid-cols-2 gap-4 mb-6">
	<div class="rounded-xl shadow p-4 bg-white dark:bg-gray-700">
		<div class="flex items-center justify-between">
			<div>
				<p class="text-sm text-gray-500 dark:text-gray-100">Completed</p>
				<h3 class="text-2xl font-bold text-gray-800 dark:text-gray-500">{pending}</h3>
			</div>
			<div class="p-3 rounded-full bg-green-100 text-green-600">
				<Check />
			</div>
		</div>
	</div>
	<div class="rounded-xl shadow p-4 bg-white dark:bg-gray-700">
		<div class="flex items-center justify-between">
			<div>
				<p class="text-sm text-gray-500 dark:text-gray-100">Pending</p>
				<h3 class="text-2xl font-bold text-gray-800 dark:text-gray-500">{completed}</h3>
			</div>
			<div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
				<Clock />
			</div>
		</div>
	</div>
</div>
