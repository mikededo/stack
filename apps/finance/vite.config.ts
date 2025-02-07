import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  envPrefix: 'STACK_',
  plugins: [sveltekit(), tailwindcss()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
