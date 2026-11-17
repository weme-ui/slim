import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useIconTileStyle = createVariants({
  slots: {
    root: 'align-middle flex-(inline center) shrink-0 relative',
    icon: 'shrink-0 pointer-events-none',
  },

  variants: {
    color: {
      accent: {},
      neutral: {},
      info: {},
      success: {},
      warning: {},
      error: {},
    },
    variant: {
      solid: {},
      soft: {},
      elevated: {},
      outline: {},
      frame: {},
      inverse: {},
    },
    size: {
      xs: { root: 'size-6', icon: 'size-3.5' },
      sm: { root: 'size-8', icon: 'size-4' },
      md: { root: 'size-10', icon: 'size-4.5' },
      lg: { root: 'size-12', icon: 'size-5.5' },
      xl: { root: 'size-14', icon: 'size-7' },
    },
    unstyled: {
      false: { root: 'rounded' },
    },
  },

  compoundVariants: [
    {
      color: 'accent',
      variant: 'solid',
      unstyled: false,
      class: { root: 'box-accent' },
    },
    {
      color: 'neutral',
      variant: 'solid',
      unstyled: false,
      class: { root: 'box-neutral' },
    },
    {
      color: 'info',
      variant: 'solid',
      unstyled: false,
      class: { root: 'box-info' },
    },
    {
      color: 'success',
      variant: 'solid',
      unstyled: false,
      class: { root: 'box-success' },
    },
    {
      color: 'warning',
      variant: 'solid',
      unstyled: false,
      class: { root: 'box-warning' },
    },
    {
      color: 'error',
      variant: 'solid',
      unstyled: false,
      class: { root: 'box-error' },
    },

    {
      color: 'accent',
      variant: 'soft',
      unstyled: false,
      class: { root: 'box-accent-soft' },
    },
    {
      color: 'neutral',
      variant: 'soft',
      unstyled: false,
      class: { root: 'box-neutral-soft' },
    },
    {
      color: 'info',
      variant: 'soft',
      unstyled: false,
      class: { root: 'box-info-soft' },
    },
    {
      color: 'success',
      variant: 'soft',
      unstyled: false,
      class: { root: 'box-success-soft' },
    },
    {
      color: 'warning',
      variant: 'soft',
      unstyled: false,
      class: { root: 'box-warning-soft' },
    },
    {
      color: 'error',
      variant: 'soft',
      unstyled: false,
      class: { root: 'box-error-soft' },
    },

    {
      color: 'accent',
      variant: 'elevated',
      unstyled: false,
      class: { root: 'box-accent-elevated' },
    },
    {
      color: 'neutral',
      variant: 'elevated',
      unstyled: false,
      class: { root: 'box-neutral-elevated' },
    },
    {
      color: 'info',
      variant: 'elevated',
      unstyled: false,
      class: { root: 'box-info-elevated' },
    },
    {
      color: 'success',
      variant: 'elevated',
      unstyled: false,
      class: { root: 'box-success-elevated' },
    },
    {
      color: 'warning',
      variant: 'elevated',
      unstyled: false,
      class: { root: 'box-warning-elevated' },
    },
    {
      color: 'error',
      variant: 'elevated',
      unstyled: false,
      class: { root: 'box-error-elevated' },
    },

    {
      color: 'accent',
      variant: 'outline',
      unstyled: false,
      class: { root: 'box-accent-outline' },
    },
    {
      color: 'neutral',
      variant: 'outline',
      unstyled: false,
      class: { root: 'box-neutral-outline' },
    },
    {
      color: 'info',
      variant: 'outline',
      unstyled: false,
      class: { root: 'box-info-outline' },
    },
    {
      color: 'success',
      variant: 'outline',
      unstyled: false,
      class: { root: 'box-success-outline' },
    },
    {
      color: 'warning',
      variant: 'outline',
      unstyled: false,
      class: { root: 'box-warning-outline' },
    },
    {
      color: 'error',
      variant: 'outline',
      unstyled: false,
      class: { root: 'box-error-outline' },
    },

    {
      color: 'accent',
      variant: 'frame',
      unstyled: false,
      class: { root: 'box-accent-frame' },
    },
    {
      color: 'neutral',
      variant: 'frame',
      unstyled: false,
      class: { root: 'box-neutral-frame' },
    },
    {
      color: 'info',
      variant: 'frame',
      unstyled: false,
      class: { root: 'box-info-frame' },
    },
    {
      color: 'success',
      variant: 'frame',
      unstyled: false,
      class: { root: 'box-success-frame' },
    },
    {
      color: 'warning',
      variant: 'frame',
      unstyled: false,
      class: { root: 'box-warning-frame' },
    },
    {
      color: 'error',
      variant: 'frame',
      unstyled: false,
      class: { root: 'box-error-frame' },
    },

    {
      color: 'accent',
      variant: 'inverse',
      unstyled: false,
      class: { root: 'box-accent-inverse' },
    },
    {
      color: 'neutral',
      variant: 'inverse',
      unstyled: false,
      class: { root: 'box-neutral-inverse' },
    },
    {
      color: 'info',
      variant: 'inverse',
      unstyled: false,
      class: { root: 'box-info-inverse' },
    },
    {
      color: 'success',
      variant: 'inverse',
      unstyled: false,
      class: { root: 'box-success-inverse' },
    },
    {
      color: 'warning',
      variant: 'inverse',
      unstyled: false,
      class: { root: 'box-warning-inverse' },
    },
    {
      color: 'error',
      variant: 'inverse',
      unstyled: false,
      class: { root: 'box-error-inverse' },
    },
  ],

  defaultVariants: {
    color: 'neutral',
    variant: 'solid',
    size: 'md',
  },
})

export type IconTileStyleSlots = (typeof useIconTileStyle)['slots']
export type IconTileStyleProps = VariantProps<typeof useIconTileStyle>
