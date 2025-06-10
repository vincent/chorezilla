<script lang="ts">
	import type { UsersResponse } from '$lib/pocketbase/generated-types';
	import TitleHeader from '../title-header/TitleHeader.svelte';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import { client, providerLogin } from '$lib/pocketbase';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { goto } from '$app/navigation';
	import * as Alert from '../ui/alert';
	import type { AuthProviderInfo } from 'pocketbase';
	import { error } from '@sveltejs/kit';

	let {
		siteName,
		redirectUrl,
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		redirectUrl: string | undefined;
		siteName: string;
	} = $props();

	const collection = client.collection('users');

	let signup = $state(true);
	let issue = $state(null);

	const form = $state({
		email: '',
		name: '',
		password: ''
	});

	function providerLoginAndRedirect(provider: AuthProviderInfo) {
		providerLogin(provider, collection)
			.then(_ => goto(redirectUrl || '/welcome'))
			.catch(error => {
				console.log(error);
				issue = error.toString();
			})
	}

	async function submit(e: SubmitEvent) {
		e.preventDefault();

		try {
			if (signup) {
				await collection.create(form);
				await collection.requestVerification(form.email);
			}

			await collection.authWithPassword<UsersResponse>(form.email, form.password);
			goto(redirectUrl || '/welcome');

		} catch (error: any) {
			console.log(error);
			issue = error.toString();
		}
	}
</script>

<div class={cn('mt-[-40px] mb-4 flex flex-col gap-6', className)} bind:this={ref} {...restProps}>
	<form onsubmit={submit}>
		<TitleHeader />

		<div class="flex flex-col gap-6">
			{#await collection.listAuthMethods({ $autoCancel: false }) then methods}
				<div class="grid gap-4 sm:grid-cols-2">
					{#if methods.oauth2?.providers.length}
						<div
							class="flex flex-wrap space-y-4 space-x-0 md:flex-nowrap md:space-y-0 md:space-x-4"
						>
							{#each methods.oauth2.providers as p}
								<Button
									type="button"
									class="h-15 w-full"
									variant="outline"
									onclick={() => providerLoginAndRedirect(p)}
								>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
										<path
											d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
											fill="currentColor"
										/>
									</svg>
									Continue with {p.name}
								</Button>
							{/each}
						</div>
					{/if}
				</div>
				<div
					class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
				>
					<span class="bg-background text-muted-foreground relative z-10 px-2"> Or </span>
				</div>
			{:catch}
				<!-- pocketbase not working -->
			{/await}

			<div class="flex flex-col items-center gap-2">
				<div class="my-2 text-center text-xl">
					{#if signup}
						Already have an account?
						<a onclick={(_) => (signup = false)} href="##" class="underline underline-offset-4">
							Sign in
						</a>
					{:else}
						Don&apos;t have an account?
						<a onclick={(_) => (signup = true)} href="##" class="underline underline-offset-4">
							Sign up
						</a>
					{/if}
				</div>
			</div>

			{#if !signup}
				<div class="flex flex-col gap-6">
					<div class="grid gap-3">
						<Label class="text-lg" for="email">Email</Label>
						<Input
							class="text-lg"
							id="email"
							type="email"
							placeholder="m@example.com"
							bind:value={form.email}
							required
						/>
					</div>
					<div class="grid gap-3">
						<Label class="text-lg" for="password">Password</Label>
						<Input
							class="text-lg"
							id="password"
							type="password"
							placeholder="*******"
							bind:value={form.password}
							required
						/>
					</div>
					<Button type="submit" class="h-15 w-full">Login</Button>
				</div>
			{:else}
				<div class="flex flex-col gap-6">
					<div class="grid gap-3">
						<Label class="text-lg" for="email">Email</Label>
						<Input
							class="text-lg"
							id="email"
							type="email"
							placeholder="m@example.com"
							bind:value={form.email}
							required
						/>
					</div>
					<div class="grid gap-3">
						<Label class="text-lg" for="password">Password</Label>
						<Input
							class="text-lg"
							id="password"
							type="password"
							placeholder="*******"
							bind:value={form.password}
							required
						/>
					</div>
					<div class="grid gap-3">
						<Label class="text-lg" for="name">Public name</Label>
						<Input
							class="text-lg"
							id="name"
							type="text"
							placeholder="MyName"
							bind:value={form.name}
							required
						/>
					</div>
					<Button type="submit" class="h-15 w-full">Signup</Button>
				</div>
			{/if}
		</div>
		{#if issue}
			<Alert.Root>
				<Alert.Title>OOops</Alert.Title>
				<Alert.Description>Can't you in. Double check your credentials.</Alert.Description>
			</Alert.Root>
		{/if}
	</form>
</div>
