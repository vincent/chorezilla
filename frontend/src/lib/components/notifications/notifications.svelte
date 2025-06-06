<script lang="ts">
	import { client } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	let { vapidPublicKey } = $props();

	function subscribe() {
		if (!vapidPublicKey) return Promise.reject("no public VAPID key")
		navigator.serviceWorker.ready
			.then(registration => registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
			}))
			.then(subscription => client.collection("user_subscriptions").create({
				user: client.authStore.record?.id,
				subscription,
			}))
			.catch(err => console.error(err));
	}

	function urlBase64ToUint8Array(base64String: string) {
		const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
		const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
		const rawData = window.atob(base64);
		return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
	}

	function getSubscription() {
		return !('serviceWorker' in navigator)
			? Promise.reject('no service-worker')
			: navigator.serviceWorker.ready.then((r) => r.pushManager.getSubscription());
	}

	onMount(() =>
		getSubscription()
			.then(function (subscription) {
				if (!subscription) return subscribe();
				console.log(JSON.stringify({ subscription }));
			})
			.catch((e) => {
				console.error('cannot use service-worker');
			})
	);
</script>

<div class="sr-only">Notifications subscription</div>
