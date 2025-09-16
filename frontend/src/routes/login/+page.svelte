<script lang="ts">
	import { goto } from "$app/navigation";
	import { client, providerLogin } from "$lib/pocketbase";
	import type { UsersResponse } from "$lib/pocketbase/generated-types";
	import type { AuthProviderInfo } from "pocketbase";

	let {
		siteName,
		redirectUrl,
	}: {
		redirectUrl: string | undefined;
		siteName: string;
	} = $props();

	const collection = client.collection('users');

	let signup = $state(false);
	let issue = $state(null);

	const form = $state({
		email: '',
		name: '',
		password: ''
	});

	function providerLoginAndRedirect(provider: AuthProviderInfo) {
		providerLogin(provider, collection)
			.then((_) => goto(redirectUrl || '/'))
			.catch((error) => {
				console.log(error);
				issue = error.toString();
			});
	}

	async function handleSubmit(e: SubmitEvent) {
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

<svelte:head>
	<title>ChoreZilla | {signup ? 'Signup' : 'Login'}</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
  <form class="bg-white p-8 rounded shadow-md w-full max-w-md" onsubmit={handleSubmit}>
    <h2 class="text-2xl font-bold mb-6 text-center">Log In</h2>
    {#if issue}
      <div class="mb-4 text-red-600">{issue}</div>
    {/if}
    <div class="mb-4">
      <label class="block mb-1 font-medium" for="email">Email</label>
      <input class="w-full border rounded px-3 py-2" id="email" type="email" bind:value={form.email} required />
    </div>
    <div class="mb-6">
      <label class="block mb-1 font-medium" for="password">Password</label>
      <input class="w-full border rounded px-3 py-2" id="password" type="password" bind:value={form.password} required />
    </div>
    <button class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition" type="submit">
      Log In
    </button>
    <p class="mt-4 text-center text-sm">
      Don't have an account?
      <button onclick={() => signup = true} class="text-indigo-600 hover:underline">Sign up</button>
    </p>
  </form>
</div>
