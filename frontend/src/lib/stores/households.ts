import type { Household } from '$lib/models';
import { get, writable } from 'svelte/store';
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
					.then(set);
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
				.then(() => households.loadCollection())
	};
};

export const households = createHouseholdsStore();

const createCurrentHouseholdStore = () => {
	const { subscribe, set, update } = writable<Household>(undefined);

	const loadDefault = () =>
		households
			.loadCollection()
			.then(() => get(households)[0])
			.then(set);

	loadDefault();

	return {
		set,
		update,
		subscribe,
		loadDefault,

		id: () =>
			new Promise<string>((resolve) => {
				const onReady = () => {
					const id = get(currentHousehold)?.id;
					if (id) resolve(id);
					else setTimeout(onReady, 200);
				};
				onReady();
			})
	};
};

export const currentHousehold = createCurrentHouseholdStore();
