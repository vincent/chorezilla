import { get, writable } from 'svelte/store';

export type Person = {
	id: string;
	name: string;
	role?: string;
	choresCompleted?: number;
	avatarColor?: string;
};

const createPeopleStore = () => {
	const { subscribe, set, update } = writable<Person[]>([
		{
			id: '1',
			name: 'Alex Johnson',
			role: 'Roommate',
			choresCompleted: 12,
			avatarColor: 'indigo'
		},
		{
			id: '2',
			name: 'Sam Wilson',
			role: 'Roommate',
			choresCompleted: 8,
			avatarColor: 'green'
		},
		{
			id: '3',
			name: 'Taylor Smith',
			role: 'Roommate',
			choresCompleted: 5,
			avatarColor: 'purple'
		},
		{
			id: '4',
			name: 'Jordan Lee',
			role: 'Roommate',
			choresCompleted: 3,
			avatarColor: 'yellow'
		},
		{
			id: '5',
			name: 'Vincent',
			role: 'Roommate',
			choresCompleted: 3,
			avatarColor: 'bg-red-100 text-red-600'
		},
	]);

	return {
		set,
		update,
		subscribe,
		reset: () => set([]),

		findPerson: (id: string) => get(people).find(p => p.id === id),

		addPerson: (person: Person) => update((people) => [...people, person]),

		removePerson: (id: string) => update((people) => people.filter((person) => person.id !== id)),

		updatePerson: (updatedPerson: Person) => update((people) => people.map((person) => person.id === updatedPerson.id ? { ...person, ...updatedPerson } : person)),
	};
};

export const people = createPeopleStore();
