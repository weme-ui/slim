import type { Theme } from '@weme-ui/unocss-preset/types'
import { presetWemeUI } from '@weme-ui/unocss-preset'
import { defineConfig } from 'unocss'
import { theme } from './src/themes/slim.theme'

export default defineConfig<Theme>({
  theme,

  presets: [
    presetWemeUI({
      cssVars: {
        'password-strength': {
          'too-weak-color': 'error.9',
          'weak-color': 'error.7',
          'medium-color': 'success.7',
          'strong-color': 'success.9',
        },
        'scrollbar': {
          'color': 'neutral.3',
          'thumb-color': 'neutral.8',
          'thumb-hover-color': 'neutral.9',
        },
        'tooltip': {
          bg: 'neutral.11',
          color: 'neutral.1',
        },
        'activity-bar': {
          'width': '3.5rem',
          'active-bg': 'neutral.3',
          'active-color': 'neutral.12',
        },
      },
    }),
  ],

  content: {
    pipeline: {
      include: [
        /\.(vue|[jt]sx|style\.[jt]s|vine\.[jt]s|mdx?|astro|elm|php|phtml|html)($|\?)/,
      ],
    },
  },
})
