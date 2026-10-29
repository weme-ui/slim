<script lang="ts" setup>
import type { PinInputEmits, PinInputProps } from './pin-input.props'
import { reactiveOmit } from '@vueuse/core'
import { PinInputInput, PinInputRoot, useForwardExpose, useForwardPropsEmits } from 'reka-ui'
import { computed, onMounted, onUnmounted } from 'vue'
import { useFormFieldControl } from '~/composables/use-form-field-context'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import { usePinInputStyle } from './pin-input.style'

const props = withDefaults(defineProps<PinInputProps>(), {
  variant: 'soft',
  size: 'md',
  length: 4,
  placeholder: '○',
  otp: true,
})

const emits = defineEmits<PinInputEmits>()
const delegated = reactiveOmit(props, 'id', 'name', 'required', 'disabled', 'invalid', 'variant', 'size', 'length', 'unstyled', 'class', 'ui')
const forwarded = useForwardPropsEmits(delegated, emits)

const {
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

const ui = computed(() => usePinInputStyle({
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
  <PinInputRoot
    v-bind="{
      ...forwarded,
      ...dataAttributes,
      id,
      name,
      required,
      disabled,
    }"
    :ref="forwardRef"
    :data-slot="$attrs['data-slot'] ?? 'pin-input'"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <PinInputInput
      v-for="(key, index) in length"
      :key="key"
      :index="index"
      :name="name ? `${name}-${key}` : undefined"
      :class="cn(ui.input(), props.ui?.input)"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </PinInputRoot>
</template>
