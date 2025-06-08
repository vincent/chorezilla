<script lang="ts">
	import type { CourtsResponse } from '$lib/pocketbase/generated-types';
	import CourtTitle from '../court-title/court-title.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import GeoLocationSearch from '../ui/location-search/GeoLocationSearch.svelte';

	let { court }: { court: CourtsResponse } = $props();
	let form = $state({
		locationName: (court.expand as any)?.location?.name || '',
		...court,
	})
</script>

<CourtTitle court={court.name ? court : { name: 'Create a new place' } as any} />
<Separator class="my-4" />
<div class="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
	<form class="flex flex-col gap-4">
		<div class="flex flex-col gap-4 location-input-group">
			<Label class="text-xl">Location</Label>
			<GeoLocationSearch bind:textValue={form.locationName} />
		</div>
		<Separator class="my-2" />
		<div class="flex flex-col gap-4">
			<Label for="header" class="text-xl">Court name</Label>
			<Input id="header" class="text-xl"value={form.name} placeholder="ex: Main field, Table two, West side, .." />
		</div>
		<div class="flex flex-col gap-4">
			<Label for="type" class="text-xl">Sport</Label>
			<Select.Root type="single" bind:value={form.sport_type}>
				<Select.Trigger id="type" class="w-full text-xl">
					{form.sport_type ?? 'Select a sport'}
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
		<div class="flex flex-col gap-4">
			<Label for="status" class="text-xl">Status</Label>
			<Select.Root type="single" bind:value={form.status}>
				<Select.Trigger id="status" class="w-full text-xl">
					{form.status ?? 'Select a status'}
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="active">Active</Select.Item>
					<Select.Item value="maintenance">In maintenance</Select.Item>
					<Select.Item value="removed">Removed</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>
		<Separator class="my-2" />
		<Button variant="outline" class="mt-8 h-15 text-xl">Done</Button>
	</form>
</div>

