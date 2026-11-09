import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useProgressCircleStyle = createVariants({
  slots: {
    root: 'group inline-flex flex-center relative',
    wrapper: 'group-data-[state=indeterminate]:animate-spin',
    track: 'stroke-background-muted',
    indicator: 'transition-stroke-dashoffset duration-300 ease-out',
    value: '',
  },

  variants: {
    color: {
      default: {
        indicator: 'stroke-foreground-highlighted',
      },
      accent: {
        indicator: 'stroke-accent',
      },
      info: {
        indicator: 'stroke-info',
      },
      success: {
        indicator: 'stroke-success',
      },
      warning: {
        indicator: 'stroke-warning',
      },
      error: {
        indicator: 'stroke-error',
      },
    },
    size: {
      sm: {
        root: 'gap-sm',
        wrapper: 'size-5',
        value: 'text-xs',
      },
      md: {
        root: 'gap-sm',
        wrapper: 'size-7',
        value: 'text-sm',
      },
      lg: {
        root: 'gap-md',
        wrapper: 'size-9',
        value: 'text-base',
      },
    },
  },

  defaultVariants: {
    color: 'default',
    size: 'md',
  },
})

export type ProgressCircleStyleSlots = (typeof useProgressCircleStyle)['slots']
export type ProgressCircleStyleProps = VariantProps<typeof useProgressCircleStyle>
