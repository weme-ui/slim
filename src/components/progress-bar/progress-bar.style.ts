import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useProgressBarStyle = createVariants({
  slots: {
    root: 'flex flex-col relative',
    track: 'rounded-full bg-muted relative overflow-hidden',
    indicator:
      'rounded-inherit h-full transition-[transform,colors] duration-300 ease-out data-[state=indeterminate]:animate-carousel',
    caption: 'text-highlighted leading-none font-medium flex flex-y-center justify-between',
    label: '',
    description: 'text-muted',
    value: '',
  },

  variants: {
    color: {
      default: {
        indicator: 'bg-foreground-highlighted',
      },
      accent: {
        indicator: 'bg-accent',
      },
      info: {
        indicator: 'bg-info',
      },
      success: {
        indicator: 'bg-success',
      },
      warning: {
        indicator: 'bg-warning',
      },
      error: {
        indicator: 'bg-error',
      },
    },
    size: {
      sm: {
        root: 'gap-1',
        track: 'h-1',
        label: 'text-xs',
        description: 'text-xs',
        value: 'text-xs',
      },
      md: {
        root: 'gap-xs',
        track: 'h-2',
        label: 'text-sm',
        description: 'text-xs',
        value: 'text-xs',
      },
      lg: {
        root: 'gap-xs',
        track: 'h-3',
        label: 'text-base',
        description: 'text-sm',
        value: 'text-sm',
      },
    },
  },

  defaultVariants: {
    color: 'default',
    size: 'md',
  },
})

export type ProgressBarStyleSlots = (typeof useProgressBarStyle)['slots']
export type ProgressBarStyleProps = VariantProps<typeof useProgressBarStyle>
