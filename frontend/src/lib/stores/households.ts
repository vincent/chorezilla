import { goto } from '$app/navigation';
import { client } from '$lib/pocketbase';
import { get, writable } from 'svelte/store';
import type { HouseholdsRecord } from '$lib/pocketbase/generated-types';

const createHouseholdsStore = () => {
	const { subscribe, set, update } = writable<HouseholdsRecord[]>([]);

	const db = () => client.collection('households')

	const loadCollection = () => {
		const hs = client.authStore.record?.households;
		return !hs?.length
			? Promise.resolve()
			: db().getFullList<HouseholdsRecord>({
				requestKey: 'households',
				filter: hs.map((h: string) => `id='${h}'`).join(' || ')
			})
			.then(set)
	}

	return {
		set,
		update,
		subscribe,
		loadCollection,
		reset: () => set([]),

		create: (name: string) => db()
			.create({ name })
			.then(() => households.loadCollection()),
	}
};

export const households = createHouseholdsStore();

const createCurrentHouseholdStore = () => {
	const { subscribe, set, update } = writable<HouseholdsRecord>(undefined);

	const loadDefault = () => households.loadCollection()
		.then(() => get(households)[0])
		.then(set);
	
	loadDefault();

	return {
		set,
		update,
		subscribe,
		loadDefault,

		id: () => new Promise<string>((resolve) => {
			const onReady = () => {
				const id = get(currentHousehold)?.id
				if (id) resolve(id)
				else setTimeout(onReady, 200)
			}
			onReady()
		}),
	}
};

export const currentHousehold = createCurrentHouseholdStore();
