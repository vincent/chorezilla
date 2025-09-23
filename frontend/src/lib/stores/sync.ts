import { households } from './households';
import { writable } from 'svelte/store';
import { members } from './members';
import { invites } from './invites';
import { chores } from './chores';
import { toasts } from './toasts';
import { rooms } from './rooms';
import { member } from './auth';

export const appReady = writable(false);

export function syncRemoteData() {
	console.debug(`sync remote data`);
	return Promise.resolve()
		.then(() => households.loadCollection())
		.then(() => syncCurrentHouseholdData())
		.catch((e) => {
			toasts.error(`There was a syncing issue`)();
			console.error(e);
		});
}

export function syncCurrentHouseholdData() {
	console.debug(`sync remote data`);
	return Promise.all([
		members.loadCollection(),
		chores.loadCollection(),
		rooms.loadCollection(),
		invites.loadCollection(),
		member.load()
	])
		.then(() => appReady.set(true))
		.catch((e) => {
			toasts.error(`There was a syncing issue`)();
			console.error(e);
		});
}

export function andSyncRemoteData<T>(a: T) {
	return syncRemoteData().then(() => a);
}
