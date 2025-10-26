<script lang="ts">
	import { button_class } from '$lib/styles.svelte';

	let { onSubmit, children, submitLabel = 'Submit', altButtons = undefined } = $props();

	function handleSubmit(e: Event) {
		e.preventDefault();
		onSubmit?.(e);
	}
</script>

<form class="flex flex-col p-8 gap-5" onsubmit={handleSubmit}>
	{@render children()}

	<div class="flex justify-between">
		{@render altButtons?.()}

		<button type="submit" class="mt-2 p-3 flex-grow {button_class}">
			{submitLabel}
		</button>
	</div>
</form>
