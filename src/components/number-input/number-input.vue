<script lang="ts" setup>
import type { NumberInputEmits, NumberInputProps } from './number-input.props'
import { reactiveOmit } from '@vueuse/core'
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot, useForwardExpose, useForwardProps } from 'reka-ui'
import { computed, onMounted, onUnmounted } from 'vue'
import { useFormFieldControl } from '~/composables/use-form-field-context'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useNumberInputStyle } from './number-input.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<NumberInputProps>(), {
  variant: 'soft',
  size: 'md',
  decrementIcon: 'ri:subtract-line',
  incrementIcon: 'ri:add-line',
})

const emits = defineEmits<NumberInputEmits>()
const delegated = reactiveOmit(props, 'id', 'name', 'required', 'disabled', 'readonly', 'invalid', 'variant', 'size', 'decrementIcon', 'incrementIcon', 'placeholder', 'unstyled', 'class', 'ui')
const forwarded = useForwardProps(delegated)

const {
  bindings,
  id,
  name,
  required,
  disabled,
  invalid,
  dataAttributes,
  registerControl,
  handleControlFocus,
  handleControlBlur,
} = useFormFieldControl(props)

const { forwardRef, currentElement } = useForwardExpose()

const modelValue = computed(() => props.modelValue)

const ui = computed(() => useNumberInputStyle({
  variant: props.variant,
  size: props.size,
  disabled: disabled.value,
  invalid: invalid.value,
  unstyled: toBoolValue(props.unstyled),
}))

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

function handleUpdate(value: number | undefined) {
  emits('update:modelValue', value)

  if (value === undefined)
    return

  emits('change', value)
}

function handleFocus(e: FocusEvent) {
  if (!handleControlFocus())
    return

  emits('focus', e)
}

function handleBlur(e: FocusEvent) {
  if (!handleControlBlur({ value: (e.target as HTMLInputElement).value }))
    return

  emits('blur', e)
}
</script>

<template>
  <NumberFieldRoot
    v-bind="{
      ...forwarded,
      ...dataAttributes,
      id,
      name,
      required,
      disabled,
      readonly,
      invalid,
    }"
    :ref="forwardRef"
    :data-slot="$attrs['data-slot'] ?? 'number-input'"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    @update:model-value="handleUpdate"
  >
    <NumberFieldDecrement :class="cn(ui.decrement(), props.ui?.decrement)">
      <slot name="decrement-icon">
        <Icon :name="decrementIcon" />
      </slot>
    </NumberFieldDecrement>

    <NumberFieldInput
      v-bind="bindings"
      :placeholder="placeholder"
      :class="cn(ui.input(), props.ui?.input)"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <NumberFieldIncrement :class="cn(ui.increment(), props.ui?.increment)">
      <slot name="increment-icon">
        <Icon :name="incrementIcon" />
      </slot>
    </NumberFieldIncrement>
  </NumberFieldRoot>
</template>
