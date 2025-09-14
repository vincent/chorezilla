<script lang="ts">
    let { title, children = undefined } = $props()
</script>

<div class="flex justify-between items-center mb-4">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>
    {@render children?.()}
</div>
