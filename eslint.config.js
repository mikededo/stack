// @ts-check

import stylistic from '@stylistic/eslint-plugin';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsEslintParser from '@typescript-eslint/parser';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import tailwind from 'eslint-plugin-tailwindcss';
import globals from 'globals';
import svelteEslintParser from 'svelte-eslint-parser';

const stylisticRules = stylistic.configs.customize({
  arrowParens: true,
  braceStyle: '1tbs',
  commaDangle: 'never',
  flat: true,
  indent: 2,
  quotes: 'single',
  semi: true
});
  // noMultipleEmptyLines: true,
  // objectCurlyNewline: true,
  // quotes: 'single',
  // semi: true
  // '@stylistic/comma-dangle': ['error', 'never'],
  // '@stylistic/indent': ['error', 2],
  // '@stylistic/js/comma-style': ['error', 'last'],
  // '@stylistic/no-multi-spaces': 'error',
  // '@stylistic/no-multiple-empty-lines': ['error', {'max': 1, 'maxBOF': 0, 'maxEOF': 0}],
  // '@stylistic/object-curly-newline': ['error', { consistent: true, 'multiline': true }],
  // '@stylistic/quotes': ['error', 'single'],
  // '@stylistic/semi': 'error'

const sharedRules = {
  'arrow-body-style': ['error', 'as-needed'],
  'no-empty-function': ['error', { allow: ['arrowFunctions'] }],
  'no-undef': 'off',
  'no-unused-vars': 'off',
  'sort-imports': 'off',
  ...(stylisticRules.rules ?? {})
};

const perfectionistRules = {
  ...perfectionist.configs['recommended-natural'].rules,
  'perfectionist/sort-exports': [
    'error',
    {
      ignoreCase: true,
      order: 'asc',
      type: 'alphabetical'
    }
  ],
  'perfectionist/sort-imports': [
    'error',
    {
      customGroups: {
        type: { 'repo-type': ['@stack/**'] },
        value: { repo: ['@stack/**'], style: ['@stack/**/styles'] }
      },
      environment: 'bun',
      groups: [
        'style',
        'repo-type',
        'type',
        'repo',
        'internal-type',
        ['parent-type', 'sibling-type', 'index-type'],

        ['builtin', 'external'],
        'internal',
        ['parent', 'sibling', 'index'],
        'object',
        'unknown'
      ],
      ignoreCase: true,
      internalPattern: ['$*/**'],
      maxLineLength: undefined,
      newlinesBetween: 'always',
      order: 'asc',
      type: 'alphabetical'
    }
  ],
  'perfectionist/sort-object-types': [
    'error',
    {
      customGroups: { callbacks: 'on*' },
      groupKind: 'required-first',
      groups: ['unknown', 'callbacks', 'multiline'],
      ignoreCase: true,
      order: 'asc',
      partitionByNewLine: true,
      type: 'alphabetical'
    }
  ],
  'perfectionist/sort-svelte-attributes': [
    'error',
    {
      customGroups: {
        'bind-directives': 'bind:*',
        'bind-this': 'bind:this',
        'class': 'class',
        'effects': 'on*',
        'style-props': '--style-props',
        'this': 'this',
        'use-directives': 'use:*'
      },
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
      ignoreCase: true,
      order: 'asc',
      type: 'alphabetical'
    }
  ]
};

export default [
  ...eslintPluginSvelte.configs['flat/recommended'],
  ...tailwind.configs['flat/recommended'],
  {
    files: ['**/*.js'],
    plugins: { '@stylistic': stylistic, perfectionist },
    rules: { ...sharedRules, ...perfectionistRules }
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: tsEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        extraFileExtensions: ['.svelte'],
        sourceType: 'module'
      }
    },
    plugins: {
      '@stylistic': stylistic,
      '@typescript-eslint': tsEslint,
      perfectionist
    },
    rules: {
      ...perfectionistRules,
      ...sharedRules,
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^(_|\\$\\$Props)',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^(_|\\$\\$Props)'
        }
      ]
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteEslintParser,
      parserOptions: {
        globals: {
          ...globals.browser,
          ...globals.node
        },
        parser: '@typescript-eslint/parser'
      }
    },
    plugins: {
      '@stylistic': stylistic,
      perfectionist
    },
    rules: {
      ...perfectionistRules,
      ...Object.fromEntries(Object.entries(stylisticRules.rules ?? {}).filter(([k]) => k !== '@stylistic/indent')),
      '@stylistic/indent': ['error', 4],
      '@stylistic/max-len': ['error', {
        code: 100,
        ignoreComments: true,
        // Somewhow ignoreStrings not working with svelte files
        ignorePattern: '(\".\"\*)|(<\!--.*-->)',
        ignoreStrings: true
      }]
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
      '**/*/src/app.html',
      '**/*/build/',
      '**/*/dist/',
      'node_modules/',
      'package/',
      'postcss.config.js',
      'tsconfig.tsbuildinfo'
    ]
  }
];
