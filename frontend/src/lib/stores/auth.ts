import { currentHouseholdId, households } from './households';
import { derived, get, writable } from 'svelte/store';
import type { HouseholdMember } from '$lib/models';
import { client } from '$lib/pocketbase';

const createMemberStore = () => {
	const { subscribe, set, update } = writable<HouseholdMember>(undefined);

	const membersDB = () => client.collection('household_members');

	const load = () =>
		households.loadCollection()
			.then(() =>
				membersDB().getFirstListItem<HouseholdMember>(
					`household='${get(currentHouseholdId)}'&&user='${client.authStore.record?.id}'`,
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
