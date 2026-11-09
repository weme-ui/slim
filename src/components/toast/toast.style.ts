import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useToastStyle = createVariants({
  slots: {
    root: 'outline-3 b rounded-lg bg-base shadow-lg transition-colors',
    container: 'px-lg py-md rounded-inherit flex',
    icon: 'mr-sm mt-0.25 rounded-full size-4.5',
    wrapper: 'rounded-inherit flex grow',
    content: 'text-left flex grow flex-col gap-0.5',
    title: 'text-sm font-medium',
    description: 'text-xs text-subtle h-5',
    actions: 'rounded-inherit flex gap-sm',
    action: 'rounded-inherit',
    close:
      'p-0.5 b rounded-inherit bg-base flex shrink-0 size-5 cursor-pointer transition-transform duration-150 ease-in-out flex-center absolute z-high active:scale-95 -right-2.5 -top-2.5',
  },

  variants: {
    variant: {
      default: {},
      accent: {
        root: 'outline-accent-3/70 b-accent shadow-accent/10',
        icon: 'text-accent',
        content: 'text-accent',
        close: 'text-accent b-accent',
      },
      neutral: {
        root: 'outline-neutral-3/70 b-neutral shadow-neutral/10',
        icon: 'text-neutral',
        content: 'text-neutral-12',
        close: 'text-neutral-11 b-neutral',
      },
      info: {
        root: 'outline-info-3/70 b-info shadow-info/10',
        icon: 'text-info',
        content: 'text-info',
        close: 'text-info b-info',
      },
      success: {
        root: 'outline-success-3/70 b-success shadow-success/10',
        icon: 'text-success',
        content: 'text-success',
        close: 'text-success b-success',
      },
      warning: {
        root: 'outline-warning-3/70 b-warning shadow-warning/10',
        icon: 'text-warning',
        content: 'text-warning',
        close: 'text-warning b-warning',
      },
      error: {
        root: 'outline-error-3/70 b-error shadow-error/10',
        icon: 'text-error',
        content: 'text-error',
        close: 'text-error b-error',
      },
      loading: {
        icon: 'animate-spin',
      },
    },
    orientation: {
      horizontal: {},
      vertical: {
        wrapper: 'flex-col gap-sm',
      },
    },
  },

  compoundVariants: [
    {
      variant: ['default', 'loading'],
      class: {
        root: 'outline-background-muted/70 b-base',
        icon: 'text-highlighted',
        content: 'text-highlighted',
        close: 'text-highlighted b-base',
      },
    },
  ],

  defaultVariants: {
    variant: 'default',
    orientation: 'horizontal',
  },
})

export type ToastStyleSlots = (typeof useToastStyle)['slots']
export type ToastStyleProps = VariantProps<typeof useToastStyle>
