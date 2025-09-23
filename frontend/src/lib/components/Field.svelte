<script lang="ts">
	let { label, children, className = '' } = $props();
</script>

<label class="flex flex-col font-medium text-black dark:text-white {className}">
	{label}
	{@render children()}
</label>
