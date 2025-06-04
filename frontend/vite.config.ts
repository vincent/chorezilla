import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const pocketbase_url = 'http://127.0.0.1:8090';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		proxy: { '/api': pocketbase_url, '/_': pocketbase_url }
	}
});
