/* eslint-disable no-constant-binary-expression */
import { client } from '$lib/pocketbase';
import { derived, get, writable } from 'svelte/store';
import { currentHousehold } from './households';
import type { ChoresRecord } from '$lib/pocketbase/generated-types';
import { addDays, addHours, addMonths, addWeeks, addYears } from 'date-fns';

function uniques(src: string[]) {
	return Object.keys(src.reduce((acc, i) => ({ ...acc, [i]: true }), {}))
}

function isDue(c: ChoresRecord) {
	if (!c.last_completed) return true;

	const now = new Date();
	const last = new Date(Date.parse(c.last_completed));

	return (
		false ||
		(c.frequency === 'yearly' && last < addYears(now, -1)) ||
		(c.frequency === 'monthly' && last < addMonths(now, -1)) ||
		(c.frequency === 'weekly' && last < addWeeks(now, -1)) ||
		(c.frequency === 'daily' && last < addDays(now, -1)) ||
		(c.frequency === 'hourly' && last < addHours(now, -1))
	);
}

// The main chores store
const createChoresStore = () => {
	const { subscribe, set, update } = writable<ChoresRecord[]>([]);

	const choresDB = () => client.collection('chores');

	const fetchAll = () =>
		currentHousehold.id().then((hid) =>
			choresDB().getFullList<ChoresRecord>({
				requestKey: 'chores',
				filter: `household='${hid}'`,
				expand: 'room'
			})
		);
	const loadCollection = () =>
		fetchAll().then((list) => {
			set(list);
			return list;
		});

	return {
		set,
		update,
		subscribe,
		loadCollection,
		reset: () => set([]),

		findChore: (id: string) => get(chores).find((c) => c.id === id),
		findChoresByRoomId: (id: string) => get(chores).filter((c) => c.room === id),

		addChore: (chore: Omit<ChoresRecord, 'id' | 'created_by'>) =>
			choresDB().create({ ...chore, created_by: client.authStore.record?.id }),
		removeChore: (id: string) => choresDB().delete(id),
		updateChore: (updatedChore: ChoresRecord) => choresDB().update(updatedChore.id, updatedChore)
	};
};

export const chores = createChoresStore();

export const userChores = derived(chores, (cs) =>
	cs.filter((row) => row.assigned_users?.includes(String(client.authStore.record?.id)))
);

export const dueChores = derived(userChores, (cs) => cs.filter((row) => isDue(row)));
export const completedChores = derived(userChores, (cs) => cs.filter((row) => !isDue(row)));

export const choresByRoom = derived(chores, (cs) => cs.reduce((acc, c) => ({
	...acc,
	[c.room]: [
		...(acc[c.room] || []),
		c,
	]
}), {} as Record<string, ChoresRecord[]>));

export const memberIdsByRoom = derived(chores, (cs) => cs.reduce((acc, c) => ({
	...acc,
	[c.room]: uniques([
		...(acc[c.room] || []),
		...(c.assigned_users || []),
	])
}), {} as Record<string, string[]>));
