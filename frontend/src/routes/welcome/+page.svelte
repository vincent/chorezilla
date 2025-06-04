<script lang="ts">
	import { GalleryVerticalEndIcon } from 'lucide-svelte';
</script>

<div class="mt-[-40px] mb-4 flex flex-col gap-6">
	<div class="flex flex-col gap-6">
		<div class="flex flex-col items-center gap-2">
			<a href="##" class="flex flex-col items-center gap-2 font-medium">
				<div class="flex size-8 items-center justify-center rounded-md">
					<GalleryVerticalEndIcon class="size-6" />
				</div>
			</a>
			<h1 class="text-3xl font-bold">¿Jugamos?</h1>
		</div>
	</div>

	<div class="flex flex-col items-center gap-2 p-4">
		<span class="text-lg font-semibold text-yellow-800">Notification Permission Needed</span>
		<p class="text-center text-yellow-700">
			You will be asked to allow notifications, as we need your permission to send you match
			invites.
			<br /><br />
			You can change your notification preferences at any time in your browser settings.
		</p>
	</div>
</div>
