<script lang="ts" setup>
import type { AcceptableValue } from 'reka-ui'
import type { RadioGroupEmits, RadioGroupProps } from './radio-group.props'
import { reactivePick } from '@vueuse/core'
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot, useForwardExpose, useForwardPropsEmits, VisuallyHidden } from 'reka-ui'
import { computed, onMounted, onUnmounted, useSlots } from 'vue'
import { useFormFieldControl } from '~/composables/use-form-field-context'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import { useRadioGroupStyle } from './radio-group.style'

const props = withDefaults(defineProps<RadioGroupProps>(), {
  variant: 'soft',
  size: 'md',
  indicator: 'start',
  orientation: 'horizontal',
})

const emits = defineEmits<RadioGroupEmits>()
const delegated = reactivePick(props, 'as', 'defaultValue', 'dir', 'loop', 'modelValue', 'orientation')
const forwarded = useForwardPropsEmits(delegated, emits)

const {
  id,
  name,
  bindings,
  disabled,
  dataAttributes,
  registerControl,
} = useFormFieldControl(props)
const { forwardRef, currentElement } = useForwardExpose()
const modelValue = computed(() => props.modelValue)

const slots = useSlots()

const hasLabel = computed(() => !!slots.label)
const hasDescription = computed(() => !!slots.description)
const hasContent = computed(() => hasLabel.value || hasDescription.value)

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

const ui = computed(() => useRadioGroupStyle({
  variant: props.variant,
  size: props.size,
  orientation: props.orientation,
  disabled: disabled.value,
  inverted: toBoolValue(props.inverted),
  unstyled: toBoolValue(props.unstyled),
}))

function getState(checked: boolean) {
  return checked
    ? 'checked'
    : 'unchecked'
}

function handleUpdate(value: AcceptableValue) {
  emits('change', value)
}
</script>

<template>
  <RadioGroupRoot
    v-bind="{
      ...forwarded,
      ...bindings,
      ...dataAttributes,
      name,
      disabled,
      required,
    }"
    :ref="forwardRef"
    :data-slot="$attrs['data-slot'] ?? 'radio-group'"
    :data-indicator="indicator"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    @update:model-value="handleUpdate"
  >
    <template v-for="(item, index) in items" :key="index">
      <RadioGroupItem
        v-slot="{ checked }"
        :value="item.value"
        :disabled="item.disabled"
        :class="cn(ui.item(), props.ui?.item, item.class)"
      >
        <div v-if="indicator === 'start'" :data-state="getState(checked)" :class="cn(ui.indicator(), props.ui?.indicator)">
          <RadioGroupIndicator force-mount :class="cn(ui.indicatorIcon(), props.ui?.indicatorIcon)">
            <slot name="indicator" :state="getState(checked)" />
          </RadioGroupIndicator>
        </div>

        <div v-if="hasContent || item.label || item.description" :data-state="getState(checked)" :class="cn(ui.content(), props.ui?.content)">
          <slot v-if="hasLabel || item.label" name="label" :state="getState(checked)">
            <span :class="cn(ui.label(), props.ui?.label)">
              {{ item.label }}
            </span>
          </slot>

          <slot v-if="hasDescription || item.description" name="description" :state="getState(checked)">
            <div :class="cn(ui.description(), props.ui?.description)">
              {{ item.description }}
            </div>
          </slot>
        </div>

        <div v-if="indicator === 'end'" :data-state="getState(checked)" :class="cn(ui.indicator(), props.ui?.indicator)">
          <RadioGroupIndicator force-mount :class="cn(ui.indicatorIcon(), props.ui?.indicatorIcon)">
            <slot name="indicator" :state="getState(checked)" />
          </RadioGroupIndicator>
        </div>

        <VisuallyHidden v-if="indicator === 'none'">
          <RadioGroupIndicator class="sr-only" />
        </VisuallyHidden>
      </RadioGroupItem>
    </template>
  </RadioGroupRoot>
</template>
