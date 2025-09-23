import { derived, get, writable } from 'svelte/store';
import type { Household } from '$lib/models';
import { andSyncRemoteData } from './sync';
import { client } from '$lib/pocketbase';
import { toasts } from './toasts';

const createHouseholdsStore = () => {
	const { subscribe, set, update } = writable<Household[]>([]);

	const db = () => client.collection('households');

	const loadCollection = () => {
		return client
			.collection('households')
			.getFullList<Household>({
				requestKey: 'households'
			})
			.then(set)
			.then(() => {
				if (!get(currentHousehold)) currentHousehold.set(get(households)[0]);
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
				.create({ name, created_by: client.authStore.record?.id })
				.then(() => client.collection('users').authRefresh())
				.then(toasts.success(`Household created`))
				.catch(toasts.error())
				.then(andSyncRemoteData)
	};
};

export const households = createHouseholdsStore();

export const currentHousehold = writable<Household>(undefined);

export const currentHouseholdId = derived(currentHousehold, (h) => h?.id);
