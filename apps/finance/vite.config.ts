import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  envPrefix: 'MSTACK_',
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
