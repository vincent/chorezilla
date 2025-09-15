import { client } from '$lib/pocketbase';
import type { HouseholdMembersRecord, HouseholdMembersResponse, UsersRecord } from '$lib/pocketbase/generated-types';
import { get, writable } from 'svelte/store';
import { currentHousehold } from './households';

export type Person = {
	memberId: string;
	userId: string;
	name: string;
	role?: string;
	choresCompleted?: number;
	avatarColor?: string;
};

const createPeopleStore = () => {
	const { subscribe, set, update } = writable<Person[]>([]);

	const membersDB = () => client.collection('household_members')

	const loadCollection = () => currentHousehold.id()
		.then(hid => membersDB()
			.getFullList<HouseholdMembersResponse>({ filter: `household='${hid}'`, expand: 'user' })
			.then(list => set(list.map(row => {
				const u = (row.expand as any).user as UsersRecord
				return {
					memberId: row.id,
					userId: u.id,
					name: u.email || 'Unknown',
					role: row.role || '',
					choresCompleted: 0,
					avatarColor: u.avatarColor || 'indigo',
				}
			})))
		)

	return {
		set,
		update,
		subscribe,
		loadCollection,
		reset: () => set([]),
		findPerson: (id: string) => get(people).find(r => r.userId === id),
		addPerson: (person: Person) => membersDB().create(person),
		removePerson: (id: string) => membersDB().delete(id),
		updatePerson: (updatedPerson: Person) => membersDB().update(updatedPerson.memberId, updatedPerson),
	}
};

export const people = createPeopleStore();
