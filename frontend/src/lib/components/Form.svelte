<script lang="ts">
	let { onSubmit, children, submitLabel = 'Submit', altButtons = undefined } = $props();
</script>

<form 
	class="flex flex-col p-8 gap-4 rounded-md bg-white dark:bg-gray-700"
	on:submit|preventDefault={onSubmit}
>
	{@render children()}

	<div class="flex justify-between">
		{@render altButtons?.()}

		<button
			type="submit"
			class="mt-2 p-3 flex-grow rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors"
		>
			{submitLabel}
		</button>
	</div>
</form>