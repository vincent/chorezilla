import { get, writable } from 'svelte/store';
import type { Room } from '../models/room.ts';
import { client } from '$lib/pocketbase/index.js';
import type { RoomsRecord } from '$lib/pocketbase/generated-types.js';
import { currentHousehold } from './households.js';

const createRoomsStore = () => {
	const { subscribe, set, update } = writable<RoomsRecord[]>([]);

	const roomsDB = () => client.collection('rooms')

	const loadCollection = () => currentHousehold.current()
		.then(hid => roomsDB().getFullList<RoomsRecord>({ filter: `household='${hid}'` }).then(set))

	return {
		set,
		update,
		subscribe,
		loadCollection,
		reset: () => set([]),
		findRoom: (id: string) => get(rooms).find(r => r.id === id),
		addRoom: (room: Room) => roomsDB().create(room).then(loadCollection),
		removeRoom: (id: string) => roomsDB().delete(id).then(loadCollection),
		updateRoom: (updatedRoom: Room) => roomsDB().update(updatedRoom.id, updatedRoom).then(loadCollection),
	};
};

export const rooms = createRoomsStore();
