<script lang="ts">
	import { CheckIcon, GalleryVerticalEndIcon, OctagonXIcon } from 'lucide-svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { geoLocationStatus, subscribed } from '$lib/hooks';
	import { Label } from "$lib/components/ui/label";
	import * as Card from "$lib/components/ui/card";
	import { page } from '$app/state';

	let redirectUrl = $state((new URL(page.url)).searchParams.get("redirect_url"))
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
		<Card.Root class="mx-auto max-w-sm">
			<Card.Content>
				<form>
					<div class="flex flex-col gap-6">
						<div class="grid gap-2">
							<Label class="text-xl font-semibold">GeoLocation</Label>
							<div class="text-lg flex justify-between">
								<span>To find nearby spots</span>
								{#if $geoLocationStatus === "granted"}
									<CheckIcon color="green" />
								{:else}
									<OctagonXIcon color="red" />
								{/if}
							</div>
						</div>
						<div class="grid gap-2">
							<Label class="text-xl font-semibold">Notifications</Label>
							<div class="text-lg flex justify-between">
								<span>To receive invites</span>
								{#if $subscribed}
									<CheckIcon color="green" />
								{:else}
									<OctagonXIcon color="red" />
								{/if}
							</div>
							<Separator />
						</div>
					</div>
				</form>
			</Card.Content>
			<Card.Footer>
				You can change your notification preferences at any time in your browser settings.
			</Card.Footer>
		</Card.Root>
		<Button
			disabled={$geoLocationStatus !== "granted"}
			class="text-xl h-20 w-full mt-8"
			href={redirectUrl}
			>Done</Button
		>
	</div>
</div>
