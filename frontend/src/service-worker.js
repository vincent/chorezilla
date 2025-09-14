/// <reference types="@sveltejs/kit" />

// type CallPushNotification struct {
// Caller       string `json:"caller"`
// Sport        string `json:"sport"`
// LocationName string `json:"location"`
// ChoreId      string `json:"choreId"`
// }

self.addEventListener('push', (event) => {
	console.log('[Service Worker] Push Received.');

	const data = event.data.json();
	console.log(`[Service Worker] Push had this data: "${event.data.json()}"`);

	const title = 'Chores';
	const options = {
		body: `Attend chore ${data.choreId} now !`,
		vibrate: [200, 100, 200, 100, 200, 100, 200],
		requireInteraction: true,
		data
	};

	event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
	console.log('[Service Worker] Push Clicked.');
	const navigationUrl = `/chores/${event.notification.data.choreId}/lobby`;
	event.waitUntil(
		clients
			.matchAll({ type: 'window' })
			.then((windows) =>
				windows[0]
					? windows[0].navigate(navigationUrl).then((client) => client.focus())
					: clients.openWindow(navigationUrl)
			)
	);
});
