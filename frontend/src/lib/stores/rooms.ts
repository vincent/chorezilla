import { get, writable } from 'svelte/store';
import type { Room } from '../models/room.ts';
import { client } from '$lib/pocketbase/index.js';
import type { RoomsRecord } from '$lib/pocketbase/generated-types.js';
import { currentHousehold } from './households.js';

const createRoomsStore = () => {
	const { subscribe, set, update } = writable<RoomsRecord[]>([]);

	const roomsDB = () => client.collection('rooms')

	const loadCollection = () => currentHousehold.id()
		.then(hid => roomsDB().getFullList<RoomsRecord>({
			filter: `household='${hid}'`,
			expand: 'chores_via_room',
			requestKey: 'rooms',
		}).then(list => {
			set(list)
			return list
		}))

	return {
		set,
		update,
		subscribe,
		loadCollection,
		reset: () => set([]),
		findRoom: (id: string) => get(rooms).find(r => r.id === id),
		addRoom: (room: Omit<RoomsRecord, 'id'>) => roomsDB().create(room),
		removeRoom: (id: string) => roomsDB().delete(id),
		updateRoom: (updatedRoom: Room) => roomsDB().update(updatedRoom.id, updatedRoom),
	};
};

export const rooms = createRoomsStore();
