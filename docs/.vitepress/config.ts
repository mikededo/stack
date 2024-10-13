import { type DefaultTheme, defineConfigWithTheme } from 'vitepress';

export default defineConfigWithTheme<DefaultTheme.Config>({
  cleanUrls: true,
  description: 'Official documentation for the Stack project',
  head: [
    ['link', { href: '/img/favicon.ico', rel: 'icon', type: 'image/png' }]
  ],
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/mikededo/stack/edit/main/docs/:path',
      text: 'Edit this page'
    },
    logo: '/img/logo.svg',
    nav: [
      // TODO: Add links
    ],
    search: { provider: 'local' },
    sidebar: [
      {
        collapsed: false,
        items: [
          { link: '/guide/start', text: 'Start' },
          { link: '/guide/local-development', text: 'Local development' },
          { link: '/guide/self-hosting', text: 'Self hosting' }
        ],
        text: 'Guide'
      },
      {
        collapsed: true,
        items: [
          { link: '/apps/finance', text: 'Finance' },
          { link: '/apps/i18n', text: 'i18n' }
        ],
        link: '/apps/',
        text: 'Applications'
      },
      {
        collapsed: true,
        items: [
          { link: '/codebase/monorepo/', text: 'Monorepo' },
          { link: '/codebase/styles', text: 'Styles' },
          {
            collapsed: true,
            items: [
              { link: '/codebase/packages/config-tailwind', text: '@stack/config-tailwind' },
              { link: '/codebase/packages/supabase', text: '@stack/supabase' },
              { link: '/codebase/packages/actions', text: '@stack/actions' },
              { link: '/codebase/packages/layouts', text: '@stack/layouts' },
              { link: '/codebase/packages/ui', text: '@stack/ui' },
              { link: '/codebase/packages/utils', text: '@stack/utils' }
            ],
            text: 'Packages'
          },
          {
            collapsed: true,
            items: [
              { link: '/codebase/apps/finance', text: '@stack/finance' },
              { link: '/codebase/apps/i18n', text: '@stack/i18n' }
            ],
            text: 'Apps'
          },
          { link: '/codebase/turbo', text: 'Turbo' },
          { link: '/codebase/supabase', text: 'Supabase' }
        ],
        text: 'Codebase'
      }
    ],
    siteTitle: 'Stack Docs'
  },
  title: 'Stack docs'
});
