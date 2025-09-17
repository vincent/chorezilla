<script lang="ts">
	let { label, children } = $props();
</script>

<label class="flex flex-col font-medium text-black dark:text-white">
	{label}
	{@render children()}
</label>
