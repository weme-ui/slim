import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useCheckboxGroupStyle = createVariants({
  slots: {
    root: 'flex',
    item: '',
    indicator: '',
    checkedIcon: '',
    indeterminateIcon: '',
    content: '',
    label: '',
    description: '',
  },

  variants: {
    variant: { soft: {}, outline: {}, card: {} },
    size: {
      sm: { root: 'py-xs gap-md' },
      md: { root: 'py-sm gap-lg' },
      lg: { root: 'py-md gap-xl' },
    },
    orientation: {
      horizontal: {},
      vertical: { root: 'flex-col' },
    },
    align: { start: {}, center: {}, end: {} },
    disabled: {
      true: { root: 'is-disabled' },
    },
    inverted: { true: {} },
    unstyled: { false: {} },
  },

  defaultVariants: {
    variant: 'soft',
    size: 'md',
    orientation: 'vertical',
    align: 'start',
  },
})

export type CheckboxGroupStyleSlots = typeof useCheckboxGroupStyle['slots']
export type CheckboxGroupStyleProps = VariantProps<typeof useCheckboxGroupStyle>
