/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{ts,svelte}': (filenames) => `eslint --max-warnings 0 ${filenames.join(' ')}`,
  '*.css': 'echo \'Find css linter\' && true',
  '*package.json': () => [
    'bun run dep:check',
    'bun run dep:lint'
  ]
};
