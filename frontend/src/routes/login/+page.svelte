<script lang="ts">
	import { goto } from '$app/navigation';
	import type { User } from '$lib/models';
	import { client } from '$lib/pocketbase';
	import { member } from '$lib/stores/auth';
	import { currentHousehold, households } from '$lib/stores/households';

	const collection = client.collection('users');

	let signup = $state(false);
	let issue = $state<string | undefined>(undefined);

	const form = $state({
		email: '',
		name: '',
		password: '',
		passwordConfirm: ''
	});

	const urlParams = new URLSearchParams(window.location.search);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		try {
			if (signup) {
				await collection.create(form);
				await collection.requestVerification(form.email);
				await collection.authWithPassword<User>(form.email, form.password);
				await households.loadCollection();
				currentHousehold.loadDefault();
				await member.load();
			} else {
				await collection.authWithPassword<User>(form.email, form.password);
			}

			goto(urlParams.get('redirectUrl') || '/');
		} catch (error) {
			console.log(error);
			issue = error?.toString();
		}
	}
</script>

<svelte:head>
	<title>ChoreZilla | {signup ? 'Signup' : 'Log in'}</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-700">
	<form class="bg-white p-8 rounded shadow-md w-full max-w-md" onsubmit={handleSubmit}>
		<h2 class="text-2xl font-bold mb-6 text-center">{signup ? 'Signup' : 'Log in'}</h2>
		{#if issue}
			<div class="mb-4 text-red-600">{issue}</div>
		{/if}
		<div class="mb-4">
			<label class="block mb-1 font-medium" for="email">Email</label>
			<input
				class="w-full border rounded px-3 py-2"
				id="email"
				type="email"
				bind:value={form.email}
				required
			/>
		</div>
		<div class="mb-6">
			<label class="block mb-1 font-medium" for="password">Password</label>
			<input
				class="w-full border rounded px-3 py-2"
				id="password"
				type="password"
				bind:value={form.password}
				required
			/>
		</div>
		{#if signup}
			<div class="mb-6">
				<label class="block mb-1 font-medium" for="passwordConfirm">Confirm password</label>
				<input
					class="w-full border rounded px-3 py-2"
					id="passwordConfirm"
					type="password"
					bind:value={form.passwordConfirm}
					required
				/>
			</div>
		{/if}
		<button
			class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
			type="submit"
		>
			{signup ? 'Sign up' : 'Log in'}
		</button>
		{#if signup}
			<p class="mt-4 text-center text-sm">
				<span class="me-2">Already have an account?</span>
				<button onclick={() => (signup = false)} class="text-indigo-600 hover:underline"
					>Sign in</button
				>
			</p>
		{:else}
			<p class="mt-4 text-center text-sm">
				<span class="me-2">Don't have an account?</span>
				<button onclick={() => (signup = true)} class="text-indigo-600 hover:underline"
					>Sign up</button
				>
			</p>
		{/if}
	</form>
</div>
