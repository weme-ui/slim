<script lang="ts" setup>
import type { ProgressBarEmits, ProgressBarProps } from './progress-bar.props'
import { reactivePick } from '@vueuse/core'
import { ProgressIndicator, ProgressRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, toRef, useSlots } from 'vue'
import { useNumberFormatter } from '~/composables/use-number-formatter'
import { cn } from '~/utils/styles'
import { useProgressBarStyle } from './progress-bar.style'

const props = withDefaults(defineProps<ProgressBarProps>(), {
  color: 'default',
  size: 'md',
  formatOptions: () => ({
    style: 'percent',
  }),
})

const emits = defineEmits<ProgressBarEmits>()
const delegated = reactivePick(
  props,
  'as',
  'asChild',
  'getValueLabel',
  'getValueText',
  'max',
  'modelValue',
)
const forwarded = useForwardPropsEmits(delegated, emits)
const formatter = useNumberFormatter(props.formatOptions)

const modelValue = toRef(() => props.modelValue)
const formatOptions = toRef(() => props.formatOptions)

const slots = useSlots()

const hasLabel = computed(() => !!slots.label || !!props.label)
const hasDescription = computed(() => !!slots.description || !!props.description)
const isIndeterminate = computed(() => modelValue.value === null)

const range = computed(() => delegated.max ?? 100)
const percentage = computed(() => (modelValue.value ?? 0) / range.value)

const valueLabel = computed(() => {
  const valueToFormat =
    formatOptions.value.style === 'percent' ? percentage.value : (modelValue.value ?? 0)
  return formatter.value.format(valueToFormat)
})

const ui = computed(() =>
  useProgressBarStyle({
    color: props.color,
    size: props.size,
  }),
)
</script>

<template>
  <ProgressRoot
    v-bind="forwarded"
    :data-slot="$attrs['data-slot'] || 'progress-bar'"
    :class="cn(ui.root(), props.ui?.root)"
  >
    <div v-if="hasLabel" :class="cn(ui.caption(), props.ui?.caption)">
      <span :class="cn(ui.label(), props.ui?.label)">
        <slot name="label">
          {{ label }}
        </slot>
      </span>

      <span v-if="!hideValue && !isIndeterminate" :class="cn(ui.value(), props.ui?.value)">
        <slot name="value" :model-value="modelValue" :value="valueLabel">
          {{ valueLabel }}
        </slot>
      </span>
    </div>

    <div :class="cn(ui.track(), props.ui?.track, props.class)">
      <ProgressIndicator
        :style="`transform: translateX(-${100 - (modelValue ?? 0)}%)`"
        :class="cn(ui.indicator(), props.ui?.indicator)"
      />
    </div>

    <p v-if="hasDescription" :class="cn(ui.description(), props.ui?.description)">
      <slot name="description">
        {{ description }}
      </slot>
    </p>
  </ProgressRoot>
</template>
