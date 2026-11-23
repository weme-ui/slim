import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useModalStyle = createVariants({
  slots: {
    root: 'fixed z-modal flex flex-col bg-modal b b-default/75 text-default shadow-lg rounded-xl',
    header: 'flex items-start gap-2 rounded-t-inherit',
    headerIconWrapper: 'flex flex-center',
    headerIcon: 'text-subtle',
    headerContent: 'flex flex-col items-start',
    headerTitle: 'text-highlighted font-semibold',
    headerDescription: 'text-subtle',
    content: 'relative flex-1',
    footer: 'flex items-center justify-end gap-2 b-t b-t-border bg-modal-footer rounded-b-inherit',
    overlay: 'fixed inset-0 z-overlay bg-black/10 pointer-events-auto backdrop-blur-3xl',
    close:
      'flex flex-center ml-auto rounded-xl transition-colors hover:(bg-muted text-highlighted)',
  },

  variants: {
    side: {
      top: { root: 'top-0 left-0 right-0 rounded-t-none min-h-modal b-t-0' },
      right: { root: 'min-w-modal top-0 right-0 bottom-0 rounded-none b-y-0' },
      bottom: { root: 'bottom-0 left-0 right-0 rounded-b-none min-h-modal b-b-0' },
      left: { root: 'min-w-modal left-0 top-0 bottom-0 rounded-none b-y-0' },
      center: { root: 'absolute absolute-center min-w-modal' },
    },
    size: {
      sm: {
        root: 'text-sm',
        header: 'px-md pt-sm',
        headerIconWrapper: 'h-5',
        headerIcon: 'size-4',
        headerDescription: 'text-xs',
        content: 'p-md',
        footer: 'px-md py-sm',
        close: 'size-5',
      },
      md: {
        root: 'text-base',
        header: 'px-lg pt-md',
        headerIconWrapper: 'h-6',
        headerIcon: 'size-5',
        headerDescription: 'text-sm',
        content: 'p-lg',
        footer: 'px-lg py-md',
        close: 'size-6',
      },
      lg: {
        root: 'text-base',
        header: 'px-xl pt-lg',
        headerIconWrapper: 'h-6',
        headerIcon: 'size-5',
        headerDescription: 'text-sm',
        content: 'p-xl',
        footer: 'px-xl py-lg',
        close: 'size-6',
      },
    },
    loading: {
      true: { headerIcon: 'animate-spin' },
    },
  },

  defaultVariants: {
    side: 'center',
    size: 'md',
  },
})

export type ModalStyleSlots = (typeof useModalStyle)['slots']
export type ModalStyleProps = VariantProps<typeof useModalStyle>
