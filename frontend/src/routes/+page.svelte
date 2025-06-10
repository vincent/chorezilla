<script lang="ts">
	import TitleHeader from '../lib/components/title-header/TitleHeader.svelte';
</script>

<div class="mt-[-40px] mb-4 flex flex-col gap-6">
	<TitleHeader />
	<div class="flex flex-col items-center gap-2 p-4">
		<span class="text-lg font-semibold text-yellow-800">Permissions needed</span>
		<p class="text-center text-yellow-700">To use the app, we need your permission.</p>
		<ul>
			<li>GeoLocation: to find nearby spots</li>
			<li>Notifications: to receive invites</li>
		</ul>
		<br /><br />
		<p>You can change your notification preferences at any time in your browser settings.</p>
	</div>
</div>
