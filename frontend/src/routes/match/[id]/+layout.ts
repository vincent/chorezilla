import { goto } from '$app/navigation';
import { client } from '$lib/pocketbase';
import type { MatchesResponse } from '$lib/pocketbase/generated-types';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, fetch }) => {
	debugger;
	const match = client
		.collection('matches')
		.getOne<MatchesResponse>(params.id, { fetch, expand: 'court,creator' })
		.catch(e => {
			debugger;
			console.error(e);
			goto("/");
		})

	return {
		match
	};
};
