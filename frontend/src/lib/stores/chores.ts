import { get, writable } from 'svelte/store';
import type { Chore } from '../models/chore.svelte';

// The main chores store
const createChoresStore = () => {
	const { subscribe, set, update } = writable<Chore[]>([
		{
			id: '1',
			title: 'Water plants',
			roomId: '1',
			location: 'Living room',
			due: 'Due in 2h',
			icon: 'droplet',
			iconColor: 'indigo'
		},
		{
			id: '2',
			title: 'Buy groceries',
			roomId: '1',
			location: 'Kitchen',
			due: 'Due tomorrow',
			icon: 'shopping-bag',
			iconColor: 'purple'
		},
		{
			id: '3',
			title: 'Take out trash',
			roomId: '2',
			location: 'Kitchen',
			due: 'Due in 1h',
			icon: 'trash-2',
			iconColor: 'red'
		},
		{
			id: '4',
			title: 'Wash the dog',
			roomId: '2',
			location: 'Garage',
			due: 'Due in 1h',
			icon: 'trash-2',
			iconColor: 'red'
		}
	]);

	return {
		set,
		update,
		subscribe,
		reset: () => set([]),

		findChore: (id: string) => get(chores).find(c => c.id === id),
		findChoresByRoomId: (id: string) => get(chores).filter(c => c.roomId === id),

		addChore: (chore: Chore) => update((chores) => [...chores, chore]),

		removeChore: (id: string) => update((chores) => chores.filter((chore) => chore.id !== id)),

		updateChore: (updatedChore: Chore) => update((chores) => chores.map((chore) => chore.id === updatedChore.id ? { ...chore, ...updatedChore } : chore)),
	};
};

export const chores = createChoresStore();
