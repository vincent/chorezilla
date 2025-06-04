<script lang="ts">
	import type { CourtsResponse } from '$lib/pocketbase/generated-types';
	import CourtTitle from '../court-title/court-title.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { HourglassIcon } from 'lucide-svelte';

	let { court }: { court: CourtsResponse } = $props();
</script>

<CourtTitle {court}>
	{#snippet after()}
		<h1 class="text-xl tracking-tight">playing</h1>
	{/snippet}
</CourtTitle>
<Separator class="my-4" />
<div class="flex w-full flex-col gap-4 overflow-y-auto px-4 text-sm">
	<div class="my-15 flex flex-col items-center gap-4">
		<HourglassIcon class="animate-[spin_30s_linear_infinite]" size="100" />
		<Button
			variant="outline"
			class="mt-15 h-30 w-full bg-red-500 text-2xl hover:bg-red-700 dark:bg-red-500 hover:dark:bg-red-700"
			href={`/join/${court.qr_code}`}>Stop the match</Button
		>
	</div>
</div>
