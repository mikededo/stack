import path from 'path';

import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteEslintParser from 'svelte-eslint-parser';
import perfectionist from 'eslint-plugin-perfectionist';
import tsEslint from 'typescript-eslint';

/** @type {import('eslint')Linter.RulesRecord} */
const sharedRules = {
  'arrow-body-style': ['error', 'as-needed'],
  'no-empty-function': ['error', { allow: ['arrowFunctions'] }],
  'no-unused-vars': 'off',
  'no-undef': 'off',
  'sort-imports': 'off'
};

const perfectionistRules = {
  ...perfectionist.configs['recommended-natural'].rules,
  'perfectionist/sort-imports': [
    'error',
    {
      type: 'alphabetical',
      order: 'asc',
      internalPattern: ['$lib/**'],
      ignoreCase: true,
      newlinesBetween: 'always',
      maxLineLength: undefined,
      groups: [
        'style',
        'repo-type',
        'type',
        'repo',
        ['builtin', 'external'],
        'internal-type',
        'internal',
        ['parent-type', 'sibling-type', 'index-type'],
        ['parent', 'sibling', 'index'],
        'object',
        'unknown'
      ],
      customGroups: {
        value: { repo: ['@mstack/**'] },
        type: { 'repo-type': ['@mstack/**'] }
      },
      environment: 'bun'
    }
  ],
  'perfectionist/sort-exports': [
    'error',
    {
      type: 'alphabetical',
      order: 'asc',
      ignoreCase: true
    }
  ],
  'perfectionist/sort-svelte-attributes': [
    'error',
    {
      type: 'alphabetical',
      order: 'asc',
      ignoreCase: true,
      groups: [
        ['this', 'bind-this'],
        'style-props',
        'class',
        ['bind-directives', 'use-directives'],
        'unknown',
        ['shorthand', 'svelte-shorthand'],
        'multiline',
        'effects'
      ],
      customGroups: {
        'style-props': '--style-props',
        'bind-directives': 'bind:*',
        'use-directives': 'use:*',
        'bind-this': 'bind:this',
        effects: 'on*',
        class: 'class',
        this: 'this'
      }
    }
  ]
};

const dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({
  resolvePluginsRelativeTo: dirname,
  baseDirectory: dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all
});

export default tsEslint.config(
  eslint.configs.recommended,
  ...compat.extends('prettier'),
  ...eslintPluginSvelte.configs['flat/recommended'].map(
    ({ rules, ...rest }) => ({
      // Workaround since svelte-eslint's typings are mismatched with ts-eslint's
      rules: { ...rules },
      ...rest
    })
  ),
  { files: ['**/*.js'], rules: sharedRules },
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
      perfectionist
    },
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.svelte']
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^(_|\\$\\$Props)',
          varsIgnorePattern: '^(_|\\$\\$Props)',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      ...perfectionistRules,
      ...sharedRules
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteEslintParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        globals: {
          ...globals.browser,
          ...globals.node
        },
        svelteFeatures: {
          // Whether to parse the `generics` attribute.
          // See https://github.com/sveltejs/rfcs/pull/38
          experimentalGenerics: true
        }
      }
    },
    plugins: { perfectionist },
    rules: {
      ...sharedRules,
      ...perfectionistRules,
      // FIXME: Temporary fix to be able to use $t
      // https://github.com/sveltejs/eslint-plugin-svelte/issues/652
      'svelte/valid-compile': 'off'
    }
  },
  {
    ignores: [
      '!.env.example',
      '.DS_Store',
      '.env.*',
      '.git',
      '**/*/.svelte-kit',
      '.vercel',
      './src/app.html',
      '**/*/build/',
      '**/*/dist/',
      'node_modules/',
      'package/',
      'postcss.config.js',
      'tsconfig.tsbuildinfo'
    ]
  }
);
