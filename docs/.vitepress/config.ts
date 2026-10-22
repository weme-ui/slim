import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Slim',
  description: 'Re-usable UI components with Reka UI and UnoCSS.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/' },
      { text: 'Components', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/weme-ui/slim' },
    ],
  },
})
