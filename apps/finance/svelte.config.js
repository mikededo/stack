import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
// @ts-check
import adapter from 'svelte-adapter-bun';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: { adapter: adapter() },
  preprocess: [vitePreprocess()],
  vitePlugin: { inspector: true }
};

export default config;
