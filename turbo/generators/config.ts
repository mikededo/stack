import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('app', {
    actions: [
      {
        destination: '{{ turbo.paths.root }}/apps/{{name}}/',
        templateFiles: 'templates/app/**/*',
        type: 'addMany'
      }
    ],
    description:
      'Creates a new SvelteKit application under the `apps` directory.',
    prompts: [
      {
        message: 'What\'s the name of the application (without the @stack/ prefix)?',
        name: 'name',
        type: 'input',
        validate: (name: string) => {
          if (typeof name !== 'string') {
            return `${name} is mus be a string`;
          }
          if (!name.length) {
            return `${name} cannot be empty`;
          }
          if (name.match(/^\./) || name.match(/^_/)) {
            return `${name} cannot start with a dot or underscore`;
          }
          if (name.trim() !== name) {
            return `${name} cannot start or end with whitespace`;
          }
          if (name.length > (214 - '@stack/'.length)) {
            return `${name} is too long. Maximum length is ${214 - '@stack/'.length}`;
          }
          if (name.toLowerCase() !== name) {
            return `${name} must be lowercase`;
          }
          if (/[~'!()*]/.test(name.split('/').slice(-1)[0])) {
            return `${name} must not contain invalid characters`;
          }

          return true;
        }
      }
    ]
  });
}
