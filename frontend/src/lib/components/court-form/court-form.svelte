<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import type { CourtsResponse } from '$lib/pocketbase/generated-types';
	import CourtTitle from '../court-title/court-title.svelte';

	let { court }: { court: CourtsResponse } = $props();
</script>

<CourtTitle court={court || ({ name: 'New court', expand: { location: { name: '' } } } as any)} />
<Separator class="my-4" />
<div class="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
	<form class="flex flex-col gap-4">
		<div class="flex flex-col gap-4">
			<Label for="header">Name</Label>
			<Input id="header" value={court.name} />
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col gap-3">
				<Label for="type">Sport</Label>
				<Select.Root type="single" bind:value={court.sport_type}>
					<Select.Trigger id="type" class="w-full">
						{court.sport_type ?? 'Select a sport'}
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="badminton">Badminton</Select.Item>
						<Select.Item value="basketball">Basketball</Select.Item>
						<Select.Item value="beach_tennis">Beach Tennis</Select.Item>
						<Select.Item value="beach_volleyball">Beach Volleyball</Select.Item>
						<Select.Item value="futsal">Futsal</Select.Item>
						<Select.Item value="handball">Handball</Select.Item>
						<Select.Item value="paddle_tennis">Paddle Tennis</Select.Item>
						<Select.Item value="racquetball">Racquetball</Select.Item>
						<Select.Item value="squash">Squash</Select.Item>
						<Select.Item value="table_tennis">Table Tennis</Select.Item>
						<Select.Item value="tennis">Tennis</Select.Item>
						<Select.Item value="volleyball">Volleyball</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
			<div class="flex flex-col gap-3">
				<Label for="status">Status</Label>
				<Select.Root type="single" bind:value={court.status}>
					<Select.Trigger id="status" class="w-full">
						{court.status ?? 'Select a status'}
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="active">Active</Select.Item>
						<Select.Item value="maintenance">In maintenance</Select.Item>
						<Select.Item value="removed">Removed</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>

			<pre>{JSON.stringify(court, null, 2)}</pre>
		</div>
	</form>
</div>

<Button variant="outline">Done</Button>
