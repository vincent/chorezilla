import type { InvitationsRecord } from '$lib/pocketbase/generated-types';
import { currentHousehold } from './households';
import { client } from '$lib/pocketbase';
import { get, writable } from 'svelte/store';

const createInvitesStore = () => {
	const { subscribe, set, update } = writable<InvitationsRecord[]>([]);

	const invitesDB = () => client.collection('invitations');

	const loadCollection = () =>
		currentHousehold.id().then((hid) =>
			invitesDB()
				.getFullList<InvitationsRecord>({
					filter: `household='${hid}'&&status='pending'`,
					requestKey: 'invites'
				})
				.then((list) => {
					set(list);
					return list;
				})
		);

	return {
		set,
		update,
		subscribe,
		loadCollection,
		reset: () => set([]),
		invite: (email: string, name: string, role: string) =>
			client.send(`/api/send-invitation`, { method: 'POST', body: {
				household: get(currentHousehold).id,
				email,
				name,
				role,
			}})
	};
};

export const invites = createInvitesStore();
