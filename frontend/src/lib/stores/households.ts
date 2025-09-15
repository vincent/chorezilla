import { client } from '$lib/pocketbase';
import type { HouseholdsRecord } from '$lib/pocketbase/generated-types';
import { get, writable } from 'svelte/store';

const createHouseholdsStore = () => {
	const { subscribe, set, update } = writable<HouseholdsRecord[]>([]);

	const db = () => client.collection('households')

	const loadCollection = () => db()
		.getFullList<HouseholdsRecord>({
			filter: client.authStore
				.record?.households
					.map((h: string) => `id = '${h}'`)
					.join(' || ')
		})
		.then(list => {
			set(list)
		})

	return {
		set,
		update,
		subscribe,
		loadCollection,
		reset: () => set([]),
	}
};

export const households = createHouseholdsStore();

const createCurrentHouseholdStore = () => {
	const { subscribe, set, update } = writable<HouseholdsRecord>(undefined);

	households.loadCollection().then(() => {
		set(get(households)[0])
	})

	return {
		set,
		update,
		subscribe,
		current: () => new Promise<string>((resolve) => {
			const onReady = () => {
				const id = get(currentHousehold)?.id
				if (id) resolve(id)
				else setTimeout(onReady, 200)
			}
			onReady()
		})
	}
};

export const currentHousehold = createCurrentHouseholdStore();
