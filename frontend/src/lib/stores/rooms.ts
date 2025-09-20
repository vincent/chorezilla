import type { Room } from '../models';
import { get, writable } from 'svelte/store';
import { client } from '$lib/pocketbase/index.js';
import { currentHouseholdId } from './households.js';
import { andSyncRemoteData } from './sync';

const createRoomsStore = () => {
	const { subscribe, set, update } = writable<Room[]>([]);

	const roomsDB = () => client.collection('rooms');

	const loadCollection = () => 
			roomsDB()
				.getFullList<Room>({
					filter: `household='${get(currentHouseholdId)}'`,
					expand: 'chores_via_room',
					requestKey: 'rooms'
				})
				.then((list) => {
					set(list);
					return list;
				})

	return {
		set,
		update,
		subscribe,
		loadCollection,
		reset: () => set([]),
		findRoom: (id: string) => get(rooms).find((r) => r.id === id),
		addRoom: (room: Omit<Room, 'id'>) => roomsDB().create(room).then(andSyncRemoteData),
		removeRoom: (id: string) => roomsDB().delete(id).then(andSyncRemoteData),
		updateRoom: (updatedRoom: Partial<Room> & { id: string }) =>
			roomsDB().update(updatedRoom.id, updatedRoom).then(andSyncRemoteData)
	};
};

export const rooms = createRoomsStore();
