<script lang="ts">
	import CourtForm from '$lib/components/court-form/court-form.svelte';
	import CourtLoading from '$lib/components/court-loading/court-loading.svelte';
	import * as Alert from '$lib/components/ui/alert';

	let { data } = $props();
</script>

<div class="flex h-full w-full flex-col px-4">
	{#await data.court}
		<CourtLoading />
	{:then court}
        <CourtForm {court} />
	{:catch}
        <Alert.Root>
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>Can't display court form.</Alert.Description>
        </Alert.Root>
	{/await}
</div>
