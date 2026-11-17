import type { Theme } from '@weme-ui/unocss-preset'
import type { UserExtendUnoConfig } from '@weme-ui/utilities'

export default <UserExtendUnoConfig<Theme>>{
  animations: {
    keyframes: {
      carousel:
        '{0%,100%{width:50%}0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}',
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
}
