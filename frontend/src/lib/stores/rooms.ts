import type { Room } from '../models';
import { get, writable } from 'svelte/store';
import { client } from '$lib/pocketbase/index.js';
import { currentHousehold } from './households.js';

const createRoomsStore = () => {
	const { subscribe, set, update } = writable<Room[]>([]);

	const roomsDB = () => client.collection('rooms');

	const loadCollection = () =>
		currentHousehold.id().then((hid) =>
			roomsDB()
				.getFullList<Room>({
					filter: `household='${hid}'`,
					expand: 'chores_via_room',
					requestKey: 'rooms'
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
		findRoom: (id: string) => get(rooms).find((r) => r.id === id),
		addRoom: (room: Omit<Room, 'id'>) => roomsDB().create(room),
		removeRoom: (id: string) => roomsDB().delete(id),
		updateRoom: (updatedRoom: Partial<Room> & { id: string }) =>
			roomsDB().update(updatedRoom.id, updatedRoom)
	};
};

export const rooms = createRoomsStore();
