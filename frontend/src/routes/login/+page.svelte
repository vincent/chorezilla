<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { client } from '$lib/pocketbase';
	import LoginForm from '$lib/components/login-form/login-form.svelte';

	const { data } = $props();
	const siteName = $derived(data?.config?.site?.name ?? 'Site name');
	let redirectUrl = page.url.searchParams.get('redirect_url') ?? undefined;
	if (client.authStore.isValid) goto(`/welcome`);
</script>

<div class="flex items-center justify-center px-4">
	<LoginForm {siteName} {redirectUrl} />
</div>
