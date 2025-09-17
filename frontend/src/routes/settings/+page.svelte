<script lang="ts">
	import { resetNotifications } from '$lib/hooks/perm-notifications.svelte';
	import Title from '$lib/components/Title.svelte';
	import Field from '$lib/components/Field.svelte';
	import { client } from '$lib/pocketbase';
	import { currentHousehold } from '$lib/stores/households';

	function testNotification(scope: 'me' | 'all') {
		client.send('/api/test-notification', {
			method: 'POST',
			body: {
				household: $currentHousehold.id,
				scope,
			},
		});
	}
</script>

<!-- Main Content -->
<main class="container mx-auto px-4 py-6">
	<Title title="Settings" />

	<!-- Settings List -->
	<div class="space-y-4">

		<Field label="Notifications">
			<div class="space-x-4">
				<button
					type="button"
					onclick={() => testNotification('me')}	
					class="mt-3 p-4 rounded-lg border-indigo-300 bg-indigo-100 text-indigo-600 font-bold hover:bg-indigo-200 transition-colors cursor-pointer"
					>Test mine</button
				>
				<button
					type="button"
					onclick={() => testNotification('all')}
					class="mt-3 p-4 rounded-lg border-indigo-300 bg-indigo-100 text-indigo-600 font-bold hover:bg-indigo-200 transition-colors cursor-pointer"
					>Test household</button
				>
				<button
					type="button"
					onclick={resetNotifications}
					class="mt-3 p-4 rounded-lg border-indigo-300 bg-indigo-100 text-indigo-600 font-bold hover:bg-indigo-200 transition-colors cursor-pointer"
					>Reset subscription</button
				>
			</div>
		</Field>

	</div>
</main>
