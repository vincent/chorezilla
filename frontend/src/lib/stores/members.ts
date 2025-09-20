import type { HouseholdMember, Person } from '$lib/models';
import { currentHouseholdId } from './households';
import { get, writable } from 'svelte/store';
import { andSyncRemoteData } from './sync';
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
	};

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
	};

	const loadCollection = () =>
			membersDB()
				.getFullList<HouseholdMember>({
					requestKey: 'household_members',
					filter: `household='${get(currentHouseholdId)}'`,
					expand: 'user'
				})
				.then((list) => list.filter(warnMissingUser).map(mapToPerson))
				.then(set)

	return {
		set,
		update,
		subscribe,
		loadCollection,
		reset: () => set([]),
		findByUserId: (id: string) => get(members).find((r) => r.userId === id),
		removePerson: (id: string) => membersDB().delete(id).then(andSyncRemoteData),
		updatePerson: (updatedPerson: Person) =>
			Promise.all([
				membersDB().update(updatedPerson.memberId, updatedPerson),
				usersDB().update(updatedPerson.userId, { name: updatedPerson.name })
			])
			.then(andSyncRemoteData)
	};
};

export const members = createMembersStore();
