// @ts-check
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.ts'],
  preprocess: [vitePreprocess()],
  vitePlugin: { inspector: true }
};

export default config;
