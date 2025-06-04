<script lang="ts">
	import { onMount } from 'svelte';

	let { vapidPublicKey } = $props();

	function subscribe() {
		navigator.serviceWorker.ready
			.then(function (registration) {
				return registration.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
				});
			})
			.then((subscription) => console.log(JSON.stringify({ subscription })))
			.catch((err) => console.error(err));
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
