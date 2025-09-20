import type { Household } from '$lib/models';
import { derived, get, writable } from 'svelte/store';
import { andSyncRemoteData } from './sync';
import { client } from '$lib/pocketbase';

const createHouseholdsStore = () => {
	const { subscribe, set, update } = writable<Household[]>([]);

	const db = () => client.collection('households');

	const loadCollection = () => {
		const hs = client.authStore.record?.households;
		return !hs?.length
			? Promise.resolve()
			: db()
					.getFullList<Household>({
						requestKey: 'households',
						filter: hs.map((h: string) => `id='${h}'`).join(' || ')
					})
					.then(set)
					.then(() => {
						if (!get(currentHousehold)) currentHousehold.set(get(households)[0])
					});
	};

	return {
		set,
		update,
		subscribe,
		loadCollection,
		reset: () => set([]),

		create: (name: string) =>
			db()
				.create({ name })
				.then(andSyncRemoteData)
	};
};

export const households = createHouseholdsStore();

export const currentHousehold = writable<Household>(undefined);

export const currentHouseholdId = derived(currentHousehold, h => h?.id)