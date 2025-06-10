<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import { Separator } from '../ui/separator';
	import { formatDate } from '$lib/utils';

	let { mostActive, settings = null, active = 'settings' } = $props();
</script>

<Tabs.Root bind:value={active} class="p-4">
	<Tabs.List class="grid h-15 w-full grid-cols-2">
		<Tabs.Trigger class="text-xl" value="famous">Players</Tabs.Trigger>
		<Tabs.Trigger class="text-xl" value="settings">Settings</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="famous" class="space-y-4 p-4">
		<div class="text-xl">Most active players here</div>
		<div class="space-y-4 p-2">
			<div class="h-[40svh] overflow-y-scroll">
				{#each mostActive as m}
					{#each m.expand.match_participants_via_match as u}
						<div class="flex justify-between pe-3">
							<span>{u.expand.user.name}</span>
							<div class="text-sm">{formatDate(new Date(Date.parse(m.end_time)))}</div>
						</div>
						<Separator class="my-2" />
					{/each}
				{/each}
			</div>
		</div>
	</Tabs.Content>
	<Tabs.Content value="settings">
		{@render settings?.()}
	</Tabs.Content>
</Tabs.Root>
