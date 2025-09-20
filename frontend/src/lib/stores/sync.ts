import { households } from "./households";
import { writable } from "svelte/store";
import { members } from "./members";
import { chores } from "./chores";
import { rooms } from "./rooms";

export const appReady = writable(false)

export function syncRemoteData() {
	console.debug(`sync remote data`)
	return Promise.resolve()
		.then(() => households.loadCollection())
		.then(() => Promise.all([
			members.loadCollection(),
			chores.loadCollection(),
			rooms.loadCollection(),
		]))
		.then(() => appReady.set(true))
}

export function andSyncRemoteData<T>(a: T) {
	return syncRemoteData().then(() => a)
}
