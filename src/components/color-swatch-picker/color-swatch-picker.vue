<script lang="ts" setup>
import type { ColorSwatchPickerEmits, ColorSwatchPickerProps } from './color-swatch-picker.props'
import { reactivePick, useVModel } from '@vueuse/core'
import {
  ColorSwatchPickerRoot,
  ColorSwatchPickerItem,
  ColorSwatchPickerItemIndicator,
  ColorSwatchPickerItemSwatch,
  useForwardPropsEmits,
  useForwardExpose,
} from 'reka-ui'
import { computed, onMounted, onUnmounted } from 'vue'
import { useFormFieldControl } from '~/composables/use-form-field-context'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useColorSwatchPickerStyle } from './color-swatch-picker.style'

const props = withDefaults(defineProps<ColorSwatchPickerProps>(), {
  size: 'md',
  radius: 'md',
  orientation: 'horizontal',
  indicatorIcon: 'ri:check-line',
})

const emits = defineEmits<ColorSwatchPickerEmits>()

const delegated = reactivePick(
  props,
  'as',
  'asChild',
  'defaultValue',
  'dir',
  'disabled',
  'highlightOnHover',
  'loop',
  'modelValue',
  'multiple',
  'name',
  'orientation',
  'required',
  'selectionBehavior',
)
const forwarded = useForwardPropsEmits(delegated, emits)

const modelValue = useVModel<ColorSwatchPickerProps, 'modelValue', 'update:modelValue'>(
  props,
  'modelValue',
  emits,
  { defaultValue: props.defaultValue },
)

const { id, name, disabled, registerControl } = useFormFieldControl(props)

const { forwardRef, currentElement } = useForwardExpose()

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
    size: props.size,
    radius: props.radius,
    orientation: props.orientation,
  }),
)

function handleSelect(value: string | string[]) {
  if (disabled.value || modelValue.value === value) return

  modelValue.value = value
  emits('change', value)
}
</script>

<template>
  <ColorSwatchPickerRoot
    v-bind="forwarded"
    :ref="forwardRef"
    :id="id"
    :name="name"
    :disabled="disabled"
    :model-value="modelValue"
    :data-slot="$attrs['data-slot'] || 'color-swatch-picker'"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    @change="handleSelect"
  >
    <ColorSwatchPickerItem
      v-for="color in colors"
      :key="color"
      :value="color"
      :class="cn(ui.item(), props.ui?.item)"
    >
      <ColorSwatchPickerItemSwatch :class="cn(ui.swatch(), props.ui?.swatch)" />
      <ColorSwatchPickerItemIndicator :class="cn(ui.indicator(), props.ui?.indicator)">
        <Icon :name="indicatorIcon" />
      </ColorSwatchPickerItemIndicator>
    </ColorSwatchPickerItem>
  </ColorSwatchPickerRoot>
</template>
