/* eslint-disable no-constant-binary-expression */
import { client } from '$lib/pocketbase';
import { get, writable } from 'svelte/store';
import { currentHousehold } from './households';
import type { ChoresRecord } from '$lib/pocketbase/generated-types';
import { addDays, addHours, addMonths, addWeeks, addYears } from 'date-fns';

function isDue(c: ChoresRecord) {
	if (!c.last_completed) return true;

	const now = new Date();
	const last = new Date(Date.parse(c.last_completed))

	return false
		|| (c.frequency === 'yearly'  && last < addYears(now, -1))
		|| (c.frequency === 'monthly' && last < addMonths(now, -1))
		|| (c.frequency === 'weekly'  && last < addWeeks(now, -1))
		|| (c.frequency === 'daily'   && last < addDays(now, -1))
		|| (c.frequency === 'hourly'  && last < addHours(now, -1))
}

// The main chores store
const createChoresStore = () => {
	const { subscribe, set, update } = writable<ChoresRecord[]>([]);

	const choresDB = () => client.collection('chores')
	
	const fetchAll = () => currentHousehold.current().then(hid => choresDB().getFullList<ChoresRecord>({
		filter: `household='${hid}'`,
		expand: 'room',
	}))
	const loadCollection = () => fetchAll().then(list => {
		set(list)
		return list
	})

	return {
		set,
		update,
		subscribe,
		loadCollection,
		reset: () => set([]),

		findChore: (id: string) => get(chores).find(c => c.id === id),
		findChoresByRoomId: (id: string) => get(chores).filter(c => c.room === id),

		addChore: (chore: ChoresRecord) => choresDB().create(chore).then(loadCollection),
		removeChore: (id: string) => choresDB().delete(id).then(loadCollection),
		updateChore: (updatedChore: ChoresRecord) => choresDB().update(updatedChore.id, updatedChore).then(loadCollection),
	};
};

export const chores = createChoresStore();

export const dueChores = $derived(get(chores)
	.filter(row => true
		&& row.assigned_users?.includes(String(client.authStore.record?.id))
		&& isDue(row)
	)
);
export const completedChores = $derived(get(chores)
	.filter(row => true
		&& row.assigned_users?.includes(String(client.authStore.record?.id))
		&& !isDue(row)
	)
);
