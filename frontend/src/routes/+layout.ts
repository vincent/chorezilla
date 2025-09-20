import type { LayoutLoad } from './$types';
import { client } from '$lib/pocketbase/index';
import { redirect } from '@sveltejs/kit';

// turn off SSR - we're JAMstack here
export const ssr = false;
// Prerendering turned off. Turn it on if you know what you're doing.
export const prerender = false;
// trailing slashes make relative paths much easier
export const trailingSlash = 'always';

export const load: LayoutLoad = async ({ url, fetch }) => {
	type Metadata = {
		title: string;
		headline?: string;
		subline?: string;
	};
	let config: {
		site: {
			url: string;
			name: string;
			logo: string;
			copyright: string;
			year: number;
		};
		signupAllowed: boolean;
		vapidPublicKey: string;
	} = {
		site: {
			url: '',
			name: '',
			logo: '',
			copyright: '',
			year: 2025
		},
		signupAllowed: false,
		vapidPublicKey: ''
	};

	const title = 'Home';
	const metadata: Metadata = {
		title
	};

	if (!client.authStore.isValid && !url.pathname.includes('login')) {
		return redirect(303, '/login?redirect_url=' + url.pathname);
	}
	try {
		config = await client.send('/api/config', { fetch, requestKey: 'config' });
	} catch (e) {
		console.error(e);
	}
	return {
		config,
		metadata
	};
};
