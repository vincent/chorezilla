<script lang="ts">
	import { geoLocationStatus, initGeoLocation, initMatchNotifications, subscribed } from '$lib/hooks';
	import TitleHeader from '$lib/components/title-header/TitleHeader.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { CheckIcon, OctagonXIcon } from 'lucide-svelte';
	import { Label } from "$lib/components/ui/label";
	import * as Card from "$lib/components/ui/card";
	import { backOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { data } = $props();
	let redirectUrl = $state((new URL(page.url)).searchParams.get("redirect_url"));
	let show = $state<"intro" | "permissions">("intro");
	let input = $state<HTMLInputElement>()
	let done = $state(false)

	function showPermissions() {
		show = "permissions";
		initMatchNotifications(data.config.vapidPublicKey, true)
		initGeoLocation()
	}

	$effect(() => {
		if ($geoLocationStatus === "granted") {
			const redirectUrl = localStorage.getItem("redirect");
			localStorage.removeItem("redirect");
			if (redirectUrl) goto(redirectUrl);
			else done = true;
		}
	})
</script>

<div class="mt-[-40px] mb-4 flex flex-col gap-6">
	<TitleHeader />
	<div
		class="flex flex-col items-center gap-2 p-4"
		in:fly={{ y: 100, delay: 300, easing: backOut }}
	>
		{#if show === "intro"}
			<Card.Root class="mx-auto max-w-sm">
				<Card.Content>
					¿Jugamos? is an app to invite challengers to play with you on this spot !
					<br><br>
					To start a match and send notifications, we need your browser permission.
				</Card.Content>
				<Card.Footer>
					<Button
						class="text-xl h-20 w-full mt-8"
						onclick={() => showPermissions()}
						>Looks good to me</Button
					>
				</Card.Footer>
			</Card.Root>
		{:else}
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
					You can change your preferences at any time in your browser settings.
				</Card.Footer>
			</Card.Root>
			{#if done}
				<input class="sr-only" bind:this={input} type="file" accept="image/*" capture="camera" />
				<Button
					disabled={$geoLocationStatus !== "granted"}
					class="text-xl h-20 w-full mt-8"
					onclick={() => input?.click()}
					>Scan a spot to start a game</Button
				>
			{:else}
				<Button
					disabled={$geoLocationStatus !== "granted"}
					class="text-xl h-20 w-full mt-8"
					href={redirectUrl}
					>Done</Button
				>
			{/if}
		{/if}
	</div>
</div>
