import antfu from '@antfu/eslint-config';
import perfectionist from 'eslint-plugin-perfectionist';

export default antfu({
  formatters: {
    css: true,
    html: true
  },
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
  ],
  jsonc: false,
  lessOpinionated: true,
  markdown: false,
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'func-style': ['error', 'expression', { allowArrowFunctions: true }]
  },
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true
  },
  svelte: true,
  toml: false,
  typescript: {
    overrides: {
      'no-use-before-define': 'off',
      'ts/consistent-type-definitions': ['error', 'type'],
      'ts/consistent-type-imports': ['error', {
        disallowTypeAnnotations: false,
        fixStyle: 'separate-type-imports',
        prefer: 'type-imports'
      }],
      'ts/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_'
        }
      ],
      'ts/no-use-before-define': ['error', {
        classes: false,
        enums: false,
        functions: true,
        ignoreTypeReferences: true,
        typedefs: false,
        variables: true
      }]
    }
  },
  vue: false,
  yaml: false
}, {
  files: ['**/*.d.ts'],
  rules: {
    'ts/consistent-type-definitions': ['off']
  }
}, {
  files: ['**/*.html'],
  rules: {
    'style/indent': ['error', 4]
  }
})
  .override(
    'antfu/stylistic/rules',
    {
      rules: {
        'style/arrow-parens': ['error', 'always'],
        'style/brace-style': ['error', '1tbs'],
        'style/comma-dangle': ['error', 'never'],
        'style/indent': [
          'error',
          2,
          {
            flatTernaryExpressions: true,
            offsetTernaryExpressions: true,
            SwitchCase: 1
          }
        ],
        'style/no-multiple-empty-lines': ['error', { max: 1 }],
        'style/operator-linebreak': ['error', 'after', {
          overrides: { ':': 'before', '?': 'before' }
        }],
        'style/quote-props': ['error', 'as-needed']
      }
    }
  )
  .override('antfu/svelte/rules', {
    rules: {
      'style/indent-binary-ops': ['error', 4],
      'svelte/html-closing-bracket-new-line': ['error'],
      'svelte/html-quotes': [
        'error',
        { prefer: 'double' }
      ],
      'svelte/indent': ['error', { indent: 4 }],
      'svelte/max-attributes-per-line': [
        'error',
        { multiline: 1, singleline: 3 }
      ],
      'svelte/no-inspect': ['error']
    }
  })
  .override(
    'antfu/perfectionist/setup',
    {
      rules: {
        ...(perfectionist.configs['recommended-alphabetical'].rules ?? {}),
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
              type: { 'repo-type': ['@stack/\\*\\*'] },
              value: { repo: ['@stack/\\*\\*'], style: ['@stack/\\*\\*/styles'] }
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
            internalPattern: ['$\\*/\\*\\*'],
            maxLineLength: undefined,
            newlinesBetween: 'always',
            order: 'asc',
            type: 'alphabetical'
          }
        ],
        'perfectionist/sort-modules': 'off',
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
        'perfectionist/sort-objects': [
          'error',
          {
            partitionByComment: true,
            partitionByNewLine: true
          }
        ]
        // FIXME: This rule has been deprecated and it is no longer working.
        // It'd be ideal to find an alternative.
        // 'perfectionist/sort-svelte-attributes': [
        //   'error',
        //   {
        //     customGroups: {
        //       'bind-directives': 'bind:*',
        //       'bind-this': 'bind:this',
        //       class: 'class',
        //       effects: 'on*',
        //       'style-props': '--style-props',
        //       this: 'this',
        //       'use-directives': 'use:*'
        //     },
        //     groups: [
        //       ['this', 'bind-this'],
        //       'style-props',
        //       'class',
        //       ['bind-directives', 'use-directives'],
        //       'unknown',
        //       ['shorthand', 'svelte-shorthand'],
        //       'multiline',
        //       'effects'
        //     ],
        //     ignoreCase: true,
        //     order: 'asc',
        //     type: 'alphabetical'
        //   }
        // ]
      }
    }
  );
