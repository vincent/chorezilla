import { get, writable } from 'svelte/store';
import type { Room } from '../models/room.ts';

const createRoomsStore = () => {
	const { subscribe, set, update } = writable<Room[]>([
		{
			id: '1',
			title: 'Living Room',
			location: 'First Floor',
			description: 'Main family area',
			icon: 'bathtub',
			iconColor: 'green'
		},
		{
			id: '2',
			title: 'Kitchen',
			location: 'First Floor',
			description: 'Where we cook',
			icon: 'broom',
			iconColor: 'yellow'
		}
	]);

	return {
		set,
		update,
		subscribe,
		reset: () => set([]),

		findRoom: (id: string) => get(rooms).find(r => r.id === id),

		addRoom: (room: Room) => update((rooms) => [...rooms, room]),

		removeRoom: (id: string) => update((rooms) => rooms.filter((room) => room.id !== id)),

		updateRoom: (updatedRoom: Room) => update((rooms) => rooms.map((room) => room.id === updatedRoom.id ? { ...room, ...updatedRoom } : room)),
	};
};

export const rooms = createRoomsStore();
