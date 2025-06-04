import { client } from '$lib/pocketbase';
import type { CourtsResponse } from '$lib/pocketbase/generated-types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, params, fetch }) => {
	// if (!client.authStore.isValid) {
	//   return redirect(
	//     303,
	//     url.pathname.match(/^\/event\/\w/) ? `/login?return_url=${url}` : "/"
	//   );
	// }

	const court: Promise<CourtsResponse> = client
		.collection('courts')
		.getFirstListItem<CourtsResponse>(client.filter(`qr_code={:qr}`, params), {
			fetch,
			expand: 'location'
		});

	return {
		court
	};
};
