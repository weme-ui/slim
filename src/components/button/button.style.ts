import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useButtonStyle = createVariants({
  slots: {
    root: 'font-medium flex-(inline center) w-fit cursor-pointer select-none text-nowrap relative',
    icon: 'shrink-0',
  },

  variants: {
    variant: {
      solid: {},
      soft: {},
      outline: {},
      ghost: {},
      plain: {},
      inverse: {},
    },
    color: {
      default: {},
      accent: {},
      neutral: {},
      info: {},
      error: {},
      success: {},
      warning: {},
    },
    size: {
      sm: { root: 'text-xs px-sm gap-xs h-6', icon: 'size-3' },
      md: { root: 'text-sm px-md gap-sm h-8', icon: 'size-3.5' },
      lg: { root: 'text-base px-lg gap-md h-10', icon: 'size-4' },
    },
    radius: {
      none: '',
      xs: { root: 'rounded-xs' },
      sm: { root: 'rounded-sm' },
      md: { root: 'rounded-md' },
      lg: { root: 'rounded-lg' },
      xl: { root: 'rounded-xl' },
      full: { root: 'rounded-full' },
    },
    disabled: {
      true: { root: 'is-disabled' },
    },
    loading: {
      true: { root: 'is-loading', icon: 'animate-spin' },
    },
    scalable: { true: {} },
    unstyled: { true: {} },
  },

  compoundVariants: [
    // #region default
    {
      variant: 'solid',
      color: 'default',
      unstyled: false,
      class: { root: 'bg-foreground-highlighted text-foreground-inverted hover:bg-foreground-highlighted/90 focus-visible:(outline-accent-7 z-high)' },
    },
    {
      variant: 'soft',
      color: 'default',
      unstyled: false,
      class: { root: 'bg-muted text-highlighted hover:bg-elevated focus-visible:(outline-accent-7 z-high)' },
    },
    {
      variant: 'outline',
      color: 'default',
      unstyled: false,
      class: { root: 'b b-base text-highlighted hover:(bg-elevated b-elevated) focus-visible:(outline-accent-7 z-high)' },
    },
    {
      variant: 'ghost',
      color: 'default',
      unstyled: false,
      class: { root: 'text-highlighted hover:bg-elevated focus-visible:(outline-accent-7 z-high)' },
    },
    {
      variant: 'plain',
      color: 'default',
      unstyled: false,
      class: { root: 'text-foreground hover:text-highlighted focus-visible:(outline-accent-7 z-high)' },
    },
    {
      variant: 'inverse',
      color: 'default',
      unstyled: false,
      class: { root: 'text-foreground bg-base hover:(text-highlighted bg-elevated) focus-visible:(outline-accent-7 z-high)' },
    },
    // #endregion default

    // #region accent
    {
      variant: 'solid',
      color: 'accent',
      unstyled: false,
      class: { root: 'fancy-accent' },
    },
    {
      variant: 'soft',
      color: 'accent',
      unstyled: false,
      class: { root: 'fancy-accent-soft' },
    },
    {
      variant: 'outline',
      color: 'accent',
      unstyled: false,
      class: { root: 'fancy-accent-outline' },
    },
    {
      variant: 'ghost',
      color: 'accent',
      unstyled: false,
      class: { root: 'fancy-accent-ghost' },
    },
    {
      variant: 'plain',
      color: 'accent',
      unstyled: false,
      class: { root: 'fancy-accent-plain' },
    },
    {
      variant: 'inverse',
      color: 'accent',
      unstyled: false,
      class: { root: 'fancy-accent-inverse' },
    },
    // #endregion accent

    // #region neutral
    {
      variant: 'solid',
      color: 'neutral',
      unstyled: false,
      class: { root: 'fancy-neutral' },
    },
    {
      variant: 'soft',
      color: 'neutral',
      unstyled: false,
      class: { root: 'fancy-neutral-soft' },
    },
    {
      variant: 'outline',
      color: 'neutral',
      unstyled: false,
      class: { root: 'fancy-neutral-outline' },
    },
    {
      variant: 'ghost',
      color: 'neutral',
      unstyled: false,
      class: { root: 'fancy-neutral-ghost' },
    },
    {
      variant: 'plain',
      color: 'neutral',
      unstyled: false,
      class: { root: 'fancy-neutral-plain' },
    },
    {
      variant: 'inverse',
      color: 'neutral',
      unstyled: false,
      class: { root: 'fancy-neutral-inverse' },
    },
    // #endregion neutral

    // #region info
    {
      variant: 'solid',
      color: 'info',
      unstyled: false,
      class: { root: 'fancy-info' },
    },
    {
      variant: 'soft',
      color: 'info',
      unstyled: false,
      class: { root: 'fancy-info-soft' },
    },
    {
      variant: 'outline',
      color: 'info',
      unstyled: false,
      class: { root: 'fancy-info-outline' },
    },
    {
      variant: 'ghost',
      color: 'info',
      unstyled: false,
      class: { root: 'fancy-info-ghost' },
    },
    {
      variant: 'plain',
      color: 'info',
      unstyled: false,
      class: { root: 'fancy-info-plain' },
    },
    {
      variant: 'inverse',
      color: 'info',
      unstyled: false,
      class: { root: 'fancy-info-inverse' },
    },
    // #endregion info

    // #region error
    {
      variant: 'solid',
      color: 'error',
      unstyled: false,
      class: { root: 'fancy-error' },
    },
    {
      variant: 'soft',
      color: 'error',
      unstyled: false,
      class: { root: 'fancy-error-soft' },
    },
    {
      variant: 'outline',
      color: 'error',
      unstyled: false,
      class: { root: 'fancy-error-outline' },
    },
    {
      variant: 'ghost',
      color: 'error',
      unstyled: false,
      class: { root: 'fancy-error-ghost' },
    },
    {
      variant: 'plain',
      color: 'error',
      unstyled: false,
      class: { root: 'fancy-error-plain' },
    },
    {
      variant: 'inverse',
      color: 'error',
      unstyled: false,
      class: { root: 'fancy-error-inverse' },
    },
    // #endregion error

    // #region success
    {
      variant: 'solid',
      color: 'success',
      unstyled: false,
      class: { root: 'fancy-success' },
    },
    {
      variant: 'soft',
      color: 'success',
      unstyled: false,
      class: { root: 'fancy-success-soft' },
    },
    {
      variant: 'outline',
      color: 'success',
      unstyled: false,
      class: { root: 'fancy-success-outline' },
    },
    {
      variant: 'ghost',
      color: 'success',
      unstyled: false,
      class: { root: 'fancy-success-ghost' },
    },
    {
      variant: 'plain',
      color: 'success',
      unstyled: false,
      class: { root: 'fancy-success-plain' },
    },
    {
      variant: 'inverse',
      color: 'success',
      unstyled: false,
      class: { root: 'fancy-success-inverse' },
    },
    // #endregion success

    // #region warning
    {
      variant: 'solid',
      color: 'warning',
      unstyled: false,
      class: { root: 'fancy-warning' },
    },
    {
      variant: 'soft',
      color: 'warning',
      unstyled: false,
      class: { root: 'fancy-warning-soft' },
    },
    {
      variant: 'outline',
      color: 'warning',
      unstyled: false,
      class: { root: 'fancy-warning-outline' },
    },
    {
      variant: 'ghost',
      color: 'warning',
      unstyled: false,
      class: { root: 'fancy-warning-ghost' },
    },
    {
      variant: 'plain',
      color: 'warning',
      unstyled: false,
      class: { root: 'fancy-warning-plain' },
    },
    {
      variant: 'inverse',
      color: 'warning',
      unstyled: false,
      class: { root: 'fancy-warning-inverse' },
    },
    // #endregion warning

    {
      disabled: false,
      loading: false,
      scalable: true,
      unstyled: false,
      class: { root: 'transition-all duration-200 ease-out aria-[pressed=true]:scale-97' },
    },
  ],

  defaultVariants: {
    variant: 'solid',
    color: 'default',
    size: 'md',
    radius: 'sm',
    scalable: true,
    unstyled: false,
  },
})

export type ButtonStyleSlots = typeof useButtonStyle['slots']
export type ButtonStyleProps = VariantProps<typeof useButtonStyle>
