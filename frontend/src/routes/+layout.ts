import type { LayoutLoad } from './$types';
import { client } from '$lib/pocketbase';
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
	} = {} as any;

	const title = 'Home';
	const metadata: Metadata = {
		title
	};

	if (url.pathname.startsWith('/login')) {
		// keep going
	
	} else if (!client.authStore.isValid) {
		return redirect(303, '/login?redirect_url=' + url.pathname);
	
	} else if (url.pathname.startsWith('/join/') || url.pathname.startsWith('/match/')) {
		// keep going
	
	} else {
		return redirect(301, '/welcome')
	}

	try {
		config = await client.send('/api/config', { fetch, requestKey: 'config' });
	} catch (e: any) {
		console.error(e);
	}
	return {
		config,
		metadata
	};
};
