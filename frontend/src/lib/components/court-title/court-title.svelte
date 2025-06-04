<script lang="ts">
	import type { CourtsResponse } from '$lib/pocketbase/generated-types';
	import type { Snippet } from 'svelte';
	let { court, after }: { court: CourtsResponse; after?: Snippet } = $props();
</script>

<div class="m-5 flex scroll-m-20 flex-col items-center">
	<h1 class="text-3xl font-extrabold tracking-tight">{court.name}</h1>
	<h3 class="text-xl tracking-tight">{(court.expand as any)?.location?.name}</h3>
	{@render after?.()}
</div>
