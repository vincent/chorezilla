<script lang="ts">
	import { shadow_hover } from "$lib/styles.svelte";
	import { EllipsisVertical } from "@lucide/svelte";

	let { href, icon = undefined, title, subtitle = undefined } = $props()
</script>

<a
	class="card bg-white dark:bg-gray-700 rounded-xl shadow p-4 flex items-center justify-between {shadow_hover} transition hover:scale-[1.01]"
	{href}
>
	<div class="flex items-center space-x-3">
		{@render icon?.()}
		<div>
			<h3 class="font-medium text-gray-800 dark:text-gray-100">{title}</h3>
			<p class="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
		</div>
	</div>
	<span class="p-2 rounded-full bg-gray-100 text-gray-600">
		<EllipsisVertical />
	</span>
</a>
