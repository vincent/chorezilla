import { goto } from '$app/navigation';
import { client } from '$lib/pocketbase';
import type { CourtsResponse } from '$lib/pocketbase/generated-types';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, params, fetch }) => {
	const court: Promise<CourtsResponse> = client
		.collection('courts')
		.getFirstListItem<CourtsResponse>(client.filter(`qr_code={:qr}`, params), {
			fetch,
			expand: 'location'
		})
		.catch(({ status }) => {
			if (status === 404 && !url.pathname.match(/\/form\/$/)) {
				goto(`${url.pathname}form/`)
			}
			return { status: 'active' } as unknown as CourtsResponse
		});

	return {
		court
	};
};
