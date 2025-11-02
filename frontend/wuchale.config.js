// @ts-check
import { adapter as svelte } from '@wuchale/svelte';
import { defineConfig } from 'wuchale';

export default defineConfig({
	otherLocales: ['es', 'fr', 'de', 'cat'],
	adapters: {
		main: svelte({
			heuristic: (msg, details) => {
				if (details?.file?.includes('.svg')) {
					return false;
				}
			}
		})
	}
});
