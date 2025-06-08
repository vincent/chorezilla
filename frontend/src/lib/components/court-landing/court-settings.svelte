<script lang="ts">
	import { client } from '$lib/pocketbase';
	import { Switch } from '../ui/switch';
	import { Label } from '../ui/label';
	import { onMount } from 'svelte';

	const challengers = client.collection("court_challengers");

	let { court } = $props();
	let checked = $state(false)

	onMount(() => getCourtNotificationSetting().then(row => checked = !!row))

	function getCourtNotificationSetting() {
		return challengers
			.getList(1, 1, {
				filter: client.filter(`user = {:user} && court = {:court}`, { 
					user: client.authStore.record?.id,
					court: court.id,
				})
			})
			.then(list => list.items[0])
	}

	function toggleCourtNotificationSetting(enabled: boolean) {
		getCourtNotificationSetting()
			.then(row => !!row
				? challengers.update(row.id, { enabled })
				: challengers.create({ 
					user: client.authStore.record?.id,
					court: court.id,
					enabled
				})
			)
	}
</script>

<div class="p-5">
	<div class="flex items-center space-x-2">
		<Switch id="notify-me" bind:checked onCheckedChange={toggleCourtNotificationSetting} />
		<Label for="notify-me" class="ms-4 text-xl">
			Notify when others seek challengers here
		</Label>
	</div>

	<div class="mt-10">
		<!--
        <Button class="w-full h-10 text-xl bg-orange-500 dark:bg-orange-500 hover:bg-orange-700 hover:dark:bg-orange-700"><MehIcon />This court is not usable</Button>
        -->
	</div>
</div>
