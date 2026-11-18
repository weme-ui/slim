import type { Theme } from '@weme-ui/unocss-preset'
import { presetWemeUI } from '@weme-ui/unocss-preset'
import { defineConfig } from 'unocss'

const steps = Array.from({ length: 12 }, (_, index) => index + 1)

export default defineConfig<Theme>({
  presets: [
    presetWemeUI({
      cssVars: {
        'password-strength': {
          'too-weak-color': 'error.9',
          'weak-color': 'error.7',
          'medium-color': 'success.7',
          'strong-color': 'success.9',
        },
        scrollbar: {
          color: 'neutral.3',
          'thumb-color': 'neutral.8',
          'thumb-hover-color': 'neutral.9',
        },
        toast: {
          width: '20rem',
        },
        tooltip: {
          bg: 'neutral.12',
          color: 'neutral.1',
        },
        'activity-bar': {
          width: '3.5rem',
          'active-bg': 'neutral.3',
          'active-color': 'neutral.12',
        },
      },
    }),
  ],

  safelist: ['accent', 'neutral'].flatMap((name) => steps.map((step) => `bg-${name}-${step}`)),

  // safelist: steps.map((step) =>
  //   ['accent', 'neutral'].map((name) => `bg-${name}-${step}`).join(' '),
  // ),

  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|vine.ts|style.[jt]s|mdx?|astro|elm|php|phtml|marko|html)($|\?)/,
      ],
    },
  },
})
