import type { Theme } from '@weme-ui/unocss-preset/types'

export const theme = {
  animation: {
    keyframes: {
      carousel: '{0%,100%{width:50%}0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}',
    },
    durations: {
      carousel: '2s',
    },
    timingFns: {
      carousel: 'linear',
    },
    counts: {
      carousel: 'infinite',
    },
  },
} satisfies Theme
