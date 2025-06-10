/// <reference types="@sveltejs/kit" />

// type CallPushNotification struct {
// Caller       string `json:"caller"`
// Sport        string `json:"sport"`
// LocationName string `json:"location"`
// CourtName    string `json:"court"`
// MatchID      string `json:"matchId"`
// }

self.addEventListener('push', (event) => {
	console.log('[Service Worker] Push Received.');

	const data = event.data.json();
	console.log(`[Service Worker] Push had this data: "${event.data.json()}"`);

	const title = '¿Jugamos?';
	const options = {
		body: `${data.caller} is calling for ${data.sport} challengers at ${data.location}`,
		vibrate: [200, 100, 200, 100, 200, 100, 200],
		requireInteraction: true,
		data
	};

	event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
	console.log('[Service Worker] Push Clicked.');
	const navigationUrl = `/match/${event.notification.data.matchId}/lobby`;
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
