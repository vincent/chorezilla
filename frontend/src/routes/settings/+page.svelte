<script lang="ts">
	import { resetNotifications } from '$lib/hooks/perm-notifications.svelte';
	import { Bug, CircleDollarSign, Github, PowerOff } from '@lucide/svelte';
	import { currentHousehold } from '$lib/stores/households';
	import Title from '$lib/components/Title.svelte';
	import Field from '$lib/components/Field.svelte';
	import { isAdmin } from '$lib/stores/auth';
	import { client } from '$lib/pocketbase';
	import { goto } from '$app/navigation';

	function testNotification(scope: 'me' | 'all') {
		client.send('/api/test-notification', {
			method: 'POST',
			body: {
				household: $currentHousehold.id,
				scope
			}
		});
	}

	function logoff() {
		client.authStore.clear()
		location.reload()
	}
</script>

<!-- Main Content -->
<main class="container mx-auto px-4 py-6">
	<Title title="Settings" />

	<!-- Settings List -->
	<div class="space-y-4">
		<Field label="Notifications">
			<div class="space-x-4 flex justify-between">
				<button
					type="button"
					onclick={() => testNotification('me')}
					class="mt-3 p-4 rounded-lg border-indigo-300 bg-indigo-100 text-indigo-600 font-bold hover:bg-indigo-200 transition-colors cursor-pointer"
					>Test mine</button
				>
				{#if $isAdmin}
					<button
						type="button"
						onclick={() => testNotification('all')}
						class="mt-3 p-4 rounded-lg border-indigo-300 bg-indigo-100 text-indigo-600 font-bold hover:bg-indigo-200 transition-colors cursor-pointer"
						>Test household</button
					>
				{/if}
				<button
					type="button"
					onclick={resetNotifications}
					class="mt-3 p-4 rounded-lg border-indigo-300 bg-indigo-100 text-indigo-600 font-bold hover:bg-indigo-200 transition-colors cursor-pointer"
					>Reset subscription</button
				>
			</div>
		</Field>
		<Field className="mt-3" label="ChoreZilla project">
			<div class="space-y-4">
				<button 
					class="mt-3 p-4 w-full flex flex-col rounded-lg border-indigo-300 bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors cursor-pointer"
					type="button"><div class="w-full flex justify-between text-gray-800">Project page <Github class="text-indigo-500"/></div>
					<span class="text-start text-sm w-full text-gray-500">Latest releases, new features, documentation</span>
				</button>
				<button 
					class="mt-3 p-4 w-full flex flex-col rounded-lg border-gray-300 bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors cursor-pointer"
					type="button"><div class="w-full flex justify-between text-gray-800">Report a bug <Bug class="text-indigo-500"/></div>
					<span class="text-start text-sm w-full text-gray-500">You found a bug? Please report it!</span>
				</button>
				<a target="_blank" 
					href="https://ko-fi.com/vlkofi"
					class="mt-3 p-4 w-full flex flex-col rounded-lg border-gray-300 bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors cursor-pointer">
					<div class="w-full flex justify-between text-gray-800">Support the project <CircleDollarSign class="text-indigo-500"/></div>
					<span class="text-start text-sm w-full text-gray-500">If you can, support the developer</span>
				</a>
			</div>
		</Field>
		<Field className="mt-3" label="Logged in a {client.authStore.record?.username}">
			<div class="space-y-4">
				<button 
					onclick={() => logoff()}
					class="mt-3 p-4 w-full flex flex-col rounded-lg border-indigo-300 bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors cursor-pointer"
					type="button"><div class="w-full flex justify-between text-gray-800">Log off <PowerOff class="text-indigo-500"/></div>
				</button>
			</div>
		</Field>
	</div>
</main>
