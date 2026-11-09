<script lang="ts" setup>
import type { ProgressCircleEmits, ProgressCircleProps } from './progress-circle.props'
import { reactivePick } from '@vueuse/core'
import { ProgressIndicator, ProgressRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, toRef } from 'vue'
import { useNumberFormatter } from '~/composables/use-number-formatter'
import { cn } from '~/utils/styles'
import { useProgressCircleStyle } from './progress-circle.style'

const props = withDefaults(defineProps<ProgressCircleProps>(), {
  color: 'default',
  size: 'md',
  formatOptions: () => ({
    style: 'percent',
  }),
})

const emits = defineEmits<ProgressCircleEmits>()
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

const STROKE_WIDTH = 4
const CENTER = 18
const RADIUS = CENTER - STROKE_WIDTH / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const modelValue = toRef(() => props.modelValue)
const formatOptions = toRef(() => props.formatOptions)

const isIndeterminate = computed(() => modelValue.value === null)
const range = computed(() => delegated.max ?? 100)
const percentage = computed(() => (modelValue.value ?? 0) / range.value)
const strokeDashoffset = computed(() => CIRCUMFERENCE - percentage.value * CIRCUMFERENCE)

const valueLabel = computed(() => {
  const valueToFormat =
    formatOptions.value.style === 'percent' ? percentage.value : (modelValue.value ?? 0)
  return formatter.value.format(valueToFormat)
})

const ui = computed(() =>
  useProgressCircleStyle({
    color: props.color,
    size: props.size,
  }),
)
</script>

<template>
  <ProgressRoot
    v-bind="forwarded"
    :data-slot="$attrs['data-slot'] || 'progress-circle'"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <svg
      fill="none"
      :viewBox="`0 0 ${CENTER * 2} ${CENTER * 2}`"
      :class="cn(ui.wrapper(), props.ui?.wrapper)"
    >
      <circle
        data-slot="progress-circle-track"
        :cx="CENTER"
        :cy="CENTER"
        :r="RADIUS"
        :stroke-width="STROKE_WIDTH"
        :class="cn(ui.track(), props.ui?.track)"
      />
      <ProgressIndicator as-child>
        <circle
          data-slot="progress-circle-indicator"
          stroke-linecap="round"
          :cx="CENTER"
          :cy="CENTER"
          :r="RADIUS"
          :stroke-dasharray="CIRCUMFERENCE"
          :stroke-dashoffset="isIndeterminate ? CIRCUMFERENCE * 0.75 : strokeDashoffset"
          :stroke-width="STROKE_WIDTH"
          :transform="`rotate(-90 ${CENTER} ${CENTER})`"
          :class="cn(ui.indicator(), props.ui?.indicator)"
        />
      </ProgressIndicator>
    </svg>

    <span v-if="!hideValue && !isIndeterminate" :class="cn(ui.value(), props.ui?.value)">
      <slot name="value" :model-value="modelValue" :value="valueLabel">
        {{ valueLabel }}
      </slot>
    </span>
  </ProgressRoot>
</template>
