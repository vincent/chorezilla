import { client } from '$lib/pocketbase';
import type { HouseholdMembersResponse, UsersRecord } from '$lib/pocketbase/generated-types';
import { currentHousehold } from './households';
import { get, writable } from 'svelte/store';

export type Person = {
	memberId: string;
	userId: string;
	email: string;
	name: string;
	role?: string;
	choresCompleted?: number;
	avatarColor?: string;
};

const createMembersStore = () => {
	const { subscribe, set, update } = writable<Person[]>([]);

	const membersDB = () => client.collection('household_members')

	const loadCollection = () => currentHousehold.id()
		.then(hid => membersDB()
			.getFullList<HouseholdMembersResponse>({
				requestKey: 'household_members',
				filter: `household='${hid}'`,
				expand: 'user'
			})
			.then(list => set(list.map(row => {
				const u = (row.expand as any).user as UsersRecord
				return {
					memberId: row.id,
					userId: u.id,
					email: u.email || 'Unknown',
					name: u.name || 'Unknown',
					role: row.role || '',
					choresCompleted: 0,
				}
			})))
		)

	return {
		set,
		update,
		subscribe,
		loadCollection,
		reset: () => set([]),
		findByUserId: (id: string) => get(members).find(r => r.userId === id),
		invite: (person: Person) => membersDB().create(person),
		removePerson: (id: string) => membersDB().delete(id),
		updatePerson: (updatedPerson: Person) => membersDB().update(updatedPerson.memberId, updatedPerson),
	}
};

export const members = createMembersStore();
