import { loadLocale } from 'wuchale/load-utils';
import { get, writable } from 'svelte/store';
import '../../locales/loader.svelte';

const createLangStore = () => {
	const store = writable<string>(undefined);

	const defaultLocale =
		localStorage?.getItem('locale') || navigator?.language?.split(/-/)?.[0]?.toLowerCase() || 'en';

	function switchLocale(loc = defaultLocale) {
		if (loc === get(store)) return Promise.resolve();
		return loadLocale(loc).then(() => {
			localStorage.setItem('locale', loc);
			store.set(loc);
		});
	}

	return {
		...store,
		switchLocale
	};
};

export const locale = createLangStore();
