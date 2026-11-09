import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useAlertStyle = createVariants({
  slots: {
    root: 'rounded flex grow-1 relative',
    icon: 'm-0.5 mr-sm shrink-0 size-4',
    content: 'text-sm text-left grow select-none',
    title: 'tracking-tight',
    description: 'text-xs',
    actions: '[&>svg]:size-4',
    close:
      'ml-md p-0.5 rounded-inherit size-5 cursor-pointer transition-colors z-high hover:bg-current/15',
  },

  variants: {
    variant: {
      solid: {},
      soft: {},
      outline: {},
      inverse: {},
    },
    status: {
      info: {},
      success: {},
      warning: {},
      error: {},
    },
    inline: {
      true: { root: 'flex-y-center' },
      false: { title: 'font-medium', description: 'op-65' },
    },
    clickable: {
      true: {
        root: 'transition-colors',
      },
    },
    withIcon: {
      true: { root: 'p-md' },
      false: { root: 'py-md pl-lg pr-md' },
    },
  },

  compoundVariants: [
    {
      variant: 'solid',
      status: undefined,
      class: { root: 'bg-foreground-highlighted text-foreground-inverted' },
    },
    {
      variant: 'soft',
      status: undefined,
      class: { root: 'bg-muted text-highlighted' },
    },
    {
      variant: 'outline',
      status: undefined,
      class: { root: 'b b-base text-highlighted' },
    },
    {
      variant: 'inverse',
      status: undefined,
      class: { root: 'bg-foreground-inverted text-highlighted' },
    },

    {
      variant: 'solid',
      status: undefined,
      clickable: true,
      class: { root: 'hover:bg-foreground-highlighted/90' },
    },
    {
      variant: 'soft',
      status: undefined,
      clickable: true,
      class: { root: 'hover:bg-elevated' },
    },
    {
      variant: 'outline',
      status: undefined,
      clickable: true,
      class: { root: 'hover:b-foreground-highlighted' },
    },
    {
      variant: 'inverse',
      status: undefined,
      clickable: true,
      class: { root: 'hover:bg-muted' },
    },

    {
      variant: 'solid',
      status: 'info',
      clickable: false,
      class: { root: 'plain-info' },
    },
    {
      variant: 'solid',
      status: 'info',
      clickable: true,
      class: { root: 'fancy-info' },
    },
    {
      variant: 'solid',
      status: 'success',
      clickable: false,
      class: { root: 'plain-success' },
    },
    {
      variant: 'solid',
      status: 'success',
      clickable: true,
      class: { root: 'fancy-success' },
    },
    {
      variant: 'solid',
      status: 'warning',
      clickable: false,
      class: { root: 'plain-warning' },
    },
    {
      variant: 'solid',
      status: 'warning',
      clickable: true,
      class: { root: 'fancy-warning' },
    },
    {
      variant: 'solid',
      status: 'error',
      clickable: false,
      class: { root: 'plain-error' },
    },
    {
      variant: 'solid',
      status: 'error',
      clickable: true,
      class: { root: 'fancy-error' },
    },

    {
      variant: 'soft',
      status: 'info',
      clickable: false,
      class: { root: 'plain-info-soft' },
    },
    {
      variant: 'soft',
      status: 'info',
      clickable: true,
      class: { root: 'fancy-info-soft' },
    },
    {
      variant: 'soft',
      status: 'success',
      clickable: false,
      class: { root: 'plain-success-soft' },
    },
    {
      variant: 'soft',
      status: 'success',
      clickable: true,
      class: { root: 'fancy-success-soft' },
    },
    {
      variant: 'soft',
      status: 'warning',
      clickable: false,
      class: { root: 'plain-warning-soft' },
    },
    {
      variant: 'soft',
      status: 'warning',
      clickable: true,
      class: { root: 'fancy-warning-soft' },
    },
    {
      variant: 'soft',
      status: 'error',
      clickable: false,
      class: { root: 'plain-error-soft' },
    },
    {
      variant: 'soft',
      status: 'error',
      clickable: true,
      class: { root: 'fancy-error-soft' },
    },

    {
      variant: 'outline',
      status: 'info',
      clickable: false,
      class: { root: 'plain-info-outline' },
    },
    {
      variant: 'outline',
      status: 'info',
      clickable: true,
      class: { root: 'fancy-info-outline' },
    },
    {
      variant: 'outline',
      status: 'success',
      clickable: false,
      class: { root: 'plain-success-outline' },
    },
    {
      variant: 'outline',
      status: 'success',
      clickable: true,
      class: { root: 'fancy-success-outline' },
    },
    {
      variant: 'outline',
      status: 'warning',
      clickable: false,
      class: { root: 'plain-warning-outline' },
    },
    {
      variant: 'outline',
      status: 'warning',
      clickable: true,
      class: { root: 'fancy-warning-outline' },
    },
    {
      variant: 'outline',
      status: 'error',
      clickable: false,
      class: { root: 'plain-error-outline' },
    },
    {
      variant: 'outline',
      status: 'error',
      clickable: true,
      class: { root: 'fancy-error-outline' },
    },

    {
      variant: 'inverse',
      status: 'info',
      clickable: false,
      class: { root: 'plain-info-inverse' },
    },
    {
      variant: 'inverse',
      status: 'info',
      clickable: true,
      class: { root: 'fancy-info-inverse' },
    },
    {
      variant: 'inverse',
      status: 'success',
      clickable: false,
      class: { root: 'plain-success-inverse' },
    },
    {
      variant: 'inverse',
      status: 'success',
      clickable: true,
      class: { root: 'fancy-success-inverse' },
    },
    {
      variant: 'inverse',
      status: 'warning',
      clickable: false,
      class: { root: 'plain-warning-inverse' },
    },
    {
      variant: 'inverse',
      status: 'warning',
      clickable: true,
      class: { root: 'fancy-warning-inverse' },
    },
    {
      variant: 'inverse',
      status: 'error',
      clickable: false,
      class: { root: 'plain-error-inverse' },
    },
    {
      variant: 'inverse',
      status: 'error',
      clickable: true,
      class: { root: 'fancy-error-inverse' },
    },
  ],

  defaultVariants: {
    variant: 'soft',
    withIcon: false,
  },
})

export type AlertStyleSlots = (typeof useAlertStyle)['slots']
export type AlertStyleProps = VariantProps<typeof useAlertStyle>
