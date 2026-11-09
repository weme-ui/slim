import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useToastProviderStyle = createVariants({
  slots: {
    root: 'flex flex-col w-[calc(100%-2rem)] fixed z-highest focus:outline-hidden data-[expanded]:h-$height mobile:w-80',
    toast: [
      'abs pointer-events-auto transform duration-200 ease-out inset-x-0 property-[transform,height] will-change-[transform,height]',
      'z-$reka-toast-index [transform:var(--transform)]',
      '[&:not([data-expanded])]:h-$reka-toast-frontmost-height',
      'data-[state=closed]:[&:not([data-expanded])]:animate-toast-collapse',
      'data-[swipe=move]:transition-none data-[state=closed]:animate-toast-close',
    ].join(' '),
  },

  variants: {
    side: {
      'top-left': {},
      top: {},
      'top-right': {},
      'bottom-right': {},
      bottom: {},
      'bottom-left': {},
    },
    swipe: {
      up: { toast: 'data-[swipe=end]:animate-toast-swipe-up' },
      down: { toast: 'data-[swipe=end]:animate-toast-swipe-down' },
      left: { toast: 'data-[swipe=end]:animate-toast-swipe-left' },
      right: { toast: 'data-[swipe=end]:animate-toast-swipe-right' },
    },
  },

  compoundVariants: [
    {
      side: ['top', 'bottom'],
      class: { root: 'left-1/2 -translate-x-1/2' },
    },
    {
      side: ['top-left', 'bottom-left'],
      class: { root: 'left-4' },
    },
    {
      side: ['top-right', 'bottom-right'],
      class: { root: 'right-4' },
    },

    {
      side: ['top', 'top-left', 'top-right'],
      class: {
        root: 'top-4',
        toast: 'top-0 data-[state=open]:animate-(slide-in-down duration-150 ease-in-out)',
      },
    },
    {
      side: ['bottom', 'bottom-left', 'bottom-right'],
      class: {
        root: 'bottom-4',
        toast: 'bottom-0 data-[state=open]:animate-(slide-in-up duration-150 ease-in-out)',
      },
    },

    {
      swipe: ['left', 'right'],
      class: {
        toast:
          'data-[swipe=move]:translate-x-$reka-toast-swipe-move-x data-[swipe=end]:translate-x-$reka-toast-swipe-end-x data-[swipe=cancel]:translate-x-0',
      },
    },
    {
      swipe: ['up', 'down'],
      class: {
        toast:
          'data-[swipe=move]:translate-y-$reka-toast-swipe-move-y data-[swipe=end]:translate-y-$reka-toast-swipe-end-y data-[swipe=cancel]:translate-y-0',
      },
    },
  ],

  defaultVariants: {
    side: 'bottom',
  },
})

export type ToastProviderStyleSlots = (typeof useToastProviderStyle)['slots']
export type ToastProviderStyleProps = VariantProps<typeof useToastProviderStyle>
