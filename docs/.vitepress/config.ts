import { type DefaultTheme, defineConfigWithTheme } from 'vitepress';

export default defineConfigWithTheme<DefaultTheme.Config>({
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
    sidebar: {
      // TODO: Add links
    },
    siteTitle: 'Stack Docs'
  },

  title: 'Stack docs'
});
