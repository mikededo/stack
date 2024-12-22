import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  envPrefix: 'STACK_',
  plugins: [sveltekit()]
});

