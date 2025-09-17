/// <reference types="@sveltejs/kit" />

// type CallPushNotification struct {
//   Type         string `json:"type"`
//   Household    string `json:"household"`
//   LocationName string `json:"location"`
//   ChoreName    string `json:"chore_name"`
//   ChoreID      string `json:"chore_id"`
// }

self.addEventListener('push', (event) => {
	console.log('[Service Worker] Push Received.');

	const data = event.data.json();
	console.log(`[Service Worker] Push had this data: `, event.data.json());

	const title = 'ChoreZilla';
	const isDue = data.type === 'due-chore';
	const options = {
		body: `${data.household} | ${data.location}: ${data.chore_name} ${isDue ? 'is due' : 'completed'}`,
		vibrate: [200, 100, 200, 100, 200, 100, 200],
		requireInteraction: isDue,
		data
	};

	event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
	console.log('[Service Worker] Push Clicked.');
	const navigationUrl = `/chores/${event.notification.data.chore_id}`;
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
