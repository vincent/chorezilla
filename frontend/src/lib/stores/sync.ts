import { households } from "./households";
import { writable } from "svelte/store";
import { members } from "./members";
import { chores } from "./chores";
import { toasts } from "./toasts";
import { rooms } from "./rooms";
import { member } from "./auth";

export const appReady = writable(false)

export function syncRemoteData() {
	console.debug(`sync remote data`)
	return Promise.resolve()
		.then(() => households.loadCollection())
		.then(() => Promise.all([
			members.loadCollection(),
			chores.loadCollection(),
			rooms.loadCollection(),
			member.load(),
		]))
		.then(() => appReady.set(true))
		.catch(toasts.error(`There was a syncing issue`))
}

export function andSyncRemoteData<T>(a: T) {
	return syncRemoteData().then(() => a)
}
