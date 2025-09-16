/* eslint-disable no-constant-binary-expression */
import { client } from '$lib/pocketbase';
import { derived, get, readable, writable } from 'svelte/store';
import { currentHousehold } from './households';
import type { ChoresRecord, HouseholdMembersRecord } from '$lib/pocketbase/generated-types';
import { addDays, addHours, addMonths, addWeeks, addYears } from 'date-fns';


const createMemberStore = () => {
	const { subscribe, set, update } = writable<HouseholdMembersRecord>(undefined);

	const membersDB = () => client.collection('household_members')

	const load = () => currentHousehold.id()
		.then(hid => membersDB().getFirstListItem<HouseholdMembersRecord>(
			`household='${hid}'&&user='${client.authStore.record?.id}'`,
			{
				requestKey: 'me',
				expand: 'user',
			}))
		.then(set)

	return {
		set,
		update,
		subscribe,
		load,
	};
};

export const member = createMemberStore();

export const isAdmin = derived(member, m => (m as any)?.role?.includes('admin'))
