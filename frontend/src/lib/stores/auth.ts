import { derived, writable } from 'svelte/store';
import { currentHousehold } from './households';
import { client } from '$lib/pocketbase';
import type { HouseholdMember } from '$lib/models';

const createMemberStore = () => {
	const { subscribe, set, update } = writable<HouseholdMember>(undefined);

	const membersDB = () => client.collection('household_members');

	const load = () =>
		currentHousehold
			.id()
			.then((hid) =>
				membersDB().getFirstListItem<HouseholdMember>(
					`household='${hid}'&&user='${client.authStore.record?.id}'`,
					{
						requestKey: 'me',
						expand: 'user'
					}
				)
			)
			.then(set);

	return {
		set,
		update,
		subscribe,
		load
	};
};

export const member = createMemberStore();

export const isAdmin = derived(member, (m) => m?.role?.includes('admin'));
