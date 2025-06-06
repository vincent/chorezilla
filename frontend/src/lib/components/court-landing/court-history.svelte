<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '../ui/separator';
	import { formatDate } from '$lib/utils';

	let { lastMatchs, mostActive, settings = null, active = 'settings' } = $props();
</script>

<Tabs.Root bind:value={active} class="p-4">
	<Tabs.List class="grid h-15 w-full grid-cols-3">
		<Tabs.Trigger class="text-xl" value="last">Last</Tabs.Trigger>
		<Tabs.Trigger class="text-xl" value="famous">Active</Tabs.Trigger>
		<Tabs.Trigger class="text-xl" value="settings">Settings</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="last">
		<Card.Root>
			<Card.Header>
				<Card.Description>Last matchs played here</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-2">
				<div class="h-[40svh] overflow-y-scroll">
					{#each lastMatchs as m}
						<div class="flex items-end justify-between pe-3">
							<div class="text-sm">{formatDate(new Date(Date.parse(m.end_time)))}</div>
							<div>
								{#each m.expand.match_participants_via_match as u}
									<div class="text-end">{u.expand.user.name}</div>
								{/each}
							</div>
						</div>
						<Separator class="my-2" />
					{/each}
				</div>
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="famous">
		<Card.Root>
			<Card.Header>
				<Card.Description>Most active players</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-2">
				<div class="h-[40svh] overflow-y-scroll">
					{#each lastMatchs as m}
						{#each m.expand.match_participants_via_match as u}
							<div class="flex justify-between pe-3">
								<span>{u.expand.user.name}</span>
								<div class="text-sm">{formatDate(new Date(Date.parse(m.end_time)))}</div>
							</div>
							<Separator class="my-2" />
						{/each}
					{/each}
				</div>
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="settings">
		{@render settings?.()}
	</Tabs.Content>
</Tabs.Root>
