import { currentHousehold, currentHouseholdId } from './households';
import type { Invitation } from '$lib/models';
import { get, writable } from 'svelte/store';
import { andSyncRemoteData } from './sync';
import { client } from '$lib/pocketbase';

const createInvitesStore = () => {
	const { subscribe, set, update } = writable<Invitation[]>([]);

	const invitesDB = () => client.collection('invitations');

	const loadCollection = () =>
		invitesDB()
			.getFullList<Invitation>({
				filter: `household='${get(currentHouseholdId)}'&&status='pending'`,
				requestKey: 'invites'
			})
			.then((list) => {
				set(list);
				return list;
			})

	return {
		set,
		update,
		subscribe,
		loadCollection,
		reset: () => set([]),
		invite: (email: string, name: string, role: string) =>
			client.send(`/api/send-invitation`, {
				method: 'POST',
				body: {
					household: get(currentHousehold).id,
					email,
					name,
					role
				}
			})
			.then(andSyncRemoteData)
	};
};

export const invites = createInvitesStore();
