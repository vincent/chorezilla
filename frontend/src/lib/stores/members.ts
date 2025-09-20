import type { HouseholdMember, Person } from '$lib/models';
import { currentHousehold } from './households';
import { get, writable } from 'svelte/store';
import { client } from '$lib/pocketbase';

const createMembersStore = () => {
	const { subscribe, set, update } = writable<Person[]>([]);

	const membersDB = () => client.collection('household_members');
	const usersDB = () => client.collection('users');

	const warnMissingUser = (row: HouseholdMember) => {
		if (!row.expand?.user) {
			console.warn(`missing associated user`);
			return false;
		}
		return true;
	}

	const mapToPerson = (row: HouseholdMember) => {
		const u = row.expand?.user;
		return {
			memberId: row.id,
			userId: String(u?.id),
			email: u?.email || 'Unknown',
			name: u?.name || 'Unknown',
			role: row.role || '',
			choresCompleted: 0
		};
	}

	const loadCollection = () =>
		currentHousehold.id().then((hid) =>
			membersDB()
				.getFullList<HouseholdMember>({
					requestKey: 'household_members',
					filter: `household='${hid}'`,
					expand: 'user'
				})
				.then((list) => list
					.filter(warnMissingUser)
					.map(mapToPerson)
				)
				.then(set)
		);

	return {
		set,
		update,
		subscribe,
		loadCollection,
		reset: () => set([]),
		findByUserId: (id: string) => get(members).find((r) => r.userId === id),
		removePerson: (id: string) => membersDB().delete(id),
		updatePerson: (updatedPerson: Person) => Promise.all([
			membersDB().update(updatedPerson.memberId, updatedPerson),
			usersDB().update(updatedPerson.userId, { name: updatedPerson.name })
		])
	};
};

export const members = createMembersStore();
