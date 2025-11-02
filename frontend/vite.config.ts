import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { wuchale } from '@wuchale/vite-plugin';
import { defineConfig } from 'vite';

const pocketbase_url = 'http://127.0.0.1:8090';

export default defineConfig({
	plugins: [tailwindcss(), wuchale(), sveltekit()],
	server: {
		proxy: { '/api': pocketbase_url, '/_': pocketbase_url }
	}
});
