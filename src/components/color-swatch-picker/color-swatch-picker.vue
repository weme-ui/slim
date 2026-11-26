<script lang="ts" setup>
import type { ColorSwatchPickerEmits, ColorSwatchPickerProps } from './color-swatch-picker.props'
import { reactivePick, useVModel } from '@vueuse/core'
import {
  VisuallyHidden,
  RovingFocusGroup,
  RovingFocusItem,
  useForwardExpose,
  useForwardPropsEmits,
} from 'reka-ui'
import { computed, onMounted, onUnmounted, useSlots } from 'vue'
import { useFormFieldControl } from '~/composables/use-form-field-context'
import { useTheme } from '~/composables/use-theme'
import { toBoolAriaValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import { useColorSwatchPickerStyle } from './color-swatch-picker.style'

const props = withDefaults(defineProps<ColorSwatchPickerProps>(), {
  type: 'accent',
  size: 'md',
  radius: 'md',
  orientation: 'horizontal',
  colors: () => [],
})

const emits = defineEmits<ColorSwatchPickerEmits>()
const delegated = reactivePick(
  props,
  'as',
  'asChild',
  'dir',
  'loop',
  'orientation',
  'currentTabStopId',
  'defaultCurrentTabStopId',
  'preventScrollOnEntryFocus',
)
const forwarded = useForwardPropsEmits(delegated, emits)

const modelValue = useVModel<ColorSwatchPickerProps, 'modelValue', 'update:modelValue'>(
  props,
  'modelValue',
  emits,
  { defaultValue: props.defaultValue },
)

const { id, name, bindings, disabled, dataAttributes, registerControl } = useFormFieldControl(props)
const { forwardRef, currentElement } = useForwardExpose()
const { getThemeColor } = useTheme()
const slots = useSlots()

let unregister: (() => void) | undefined

onMounted(() => {
  unregister = registerControl({
    id: () => id.value,
    element: () => currentElement.value,
    getValue: () => modelValue.value,
  })
})

onUnmounted(() => {
  unregister?.()
})

const ui = computed(() =>
  useColorSwatchPickerStyle({
    orientation: props.orientation,
    size: props.size,
    custom: !!slots.default,
  }),
)

function getColor(value: string) {
  return getThemeColor(value) || 'var(--text)'
}

function getState(val: string) {
  return val === modelValue.value ? 'checked' : 'unchecked'
}

function handleSelect(value: string) {
  if (disabled.value || modelValue.value === value) return

  modelValue.value = value
  emits('update:modelValue', value)
  emits('change', value)
}
</script>

<template>
  <RovingFocusGroup
    v-bind="{ ...forwarded, ...dataAttributes }"
    role="radiogroup"
    :ref="forwardRef"
    :data-slot="$attrs['data-slot'] || 'color-swatch-picker'"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <RovingFocusItem
      v-for="color in colors"
      :key="color"
      role="radio"
      :active="modelValue === color"
      :aria-label="color"
      :aria-checked="getState(color) === 'checked'"
      :data-state="getState(color)"
      :class="cn(ui.item(), props.ui?.item)"
      :style="{ '--swatch-color': getColor(color) }"
      @focus="handleSelect(color)"
      @click="handleSelect(color)"
      @mousedown.left="
        (event: MouseEvent) => {
          if (!disabled && event.ctrlKey === false) {
            handleSelect(color)
          } else {
            event.preventDefault()
          }
        }
      "
      @keydown.enter.space="handleSelect(color)"
    >
      <slot>
        <div :class="cn(ui.swatch(), props.ui?.swatch)" />
      </slot>
    </RovingFocusItem>

    <VisuallyHidden
      as="input"
      v-bind="bindings"
      :id="id"
      :name="name"
      :disabled="disabled"
      :aria-disabled="toBoolAriaValue(disabled)"
    />
  </RovingFocusGroup>
</template>
