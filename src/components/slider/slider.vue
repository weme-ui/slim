<script lang="ts" setup>
import type { SliderEmits, SliderProps } from './slider.props'
import { reactiveOmit, useElementSize } from '@vueuse/core'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardExpose, useForwardPropsEmits } from 'reka-ui'
import { computed, nextTick, onMounted, onUnmounted, ref, toRefs } from 'vue'
import { useFormFieldControl } from '~/composables/use-form-field-context'
import { toBoolAriaValue, toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Tooltip from '../tooltip/tooltip.vue'
import { useSliderStyle } from './slider.style'

const props = withDefaults(defineProps<SliderProps>(), {
  size: 'md',
  orientation: 'horizontal',
  inverted: false,
})

const emits = defineEmits<SliderEmits>()
const delegated = reactiveOmit(props, 'disabled', 'name', 'required', 'size', 'unstyled', 'class', 'ui', 'showSteps', 'showMarks')
const forwarded = useForwardPropsEmits(delegated, emits)

const {
  id,
  name,
  disabled,
  required,
  dataAttributes,
  registerControl,
} = useFormFieldControl(props)
const { forwardRef, currentElement } = useForwardExpose()
const { forwardRef: thumbRef, currentElement: thumbElement } = useForwardExpose()

const { max, dir, inverted } = toRefs(props)

const isSlidingFromLeft = computed(() => (dir?.value !== 'rtl' && !inverted.value) || (dir?.value !== 'ltr' && inverted.value))
const direction = computed(() => isSlidingFromLeft.value
  ? 1
  : -1)

const thumbSize = useElementSize(thumbElement)
const orientationSize = computed(
  () => props.orientation === 'horizontal'
    ? thumbSize.width.value
    : thumbSize.height.value,
)

const computedValues = computed(() => props.modelValue || props.defaultValue || [0])
const computedSteps = computed(() => Math.min((max.value || 100) / (props.step || 1), 10) + 1)

const ui = computed(() => useSliderStyle({
  orientation: props.orientation,
  size: props.size,
  disabled: disabled.value,
  unstyled: toBoolValue(props.unstyled),
}))

const pressed = ref<number | null>(null)

let unregister: (() => void) | undefined

onMounted(() => {
  unregister = registerControl({
    id: () => id.value,
    element: () => currentElement.value,
    getValue: () => computedValues.value,
  })
})

onUnmounted(() => {
  unregister?.()
})

function getThumbInBoundsOffset(percent: number) {
  const halfWidth = orientationSize.value / 2
  const halfPercent = 50
  const offset = linearScale([0, halfPercent], [0, halfWidth])

  return (halfWidth - offset(percent) * direction.value) * direction.value
}

function linearScale(input: readonly [number, number], output: readonly [number, number]) {
  return (value: number) => {
    if (input[0] === input[1] || output[0] === output[1])
      return output[0]
    const ratio = (output[1] - output[0]) / (input[1] - input[0])
    return output[0] + ratio * (value - input[0])
  }
}

function handlePress(value: number | null) {
  nextTick(() => {
    pressed.value = value
  })
}
</script>

<template>
  <div :class="cn(ui.wrapper(), props.ui?.wrapper)">
    <SliderRoot
      :ref="forwardRef"
      v-bind="{ ...forwarded, ...dataAttributes, disabled, name, required }"
      :data-slot="$attrs['data-slot'] || 'slider'"
      :class="cn(ui.root(), props.ui?.root, props.class)"
    >
      <SliderTrack :class="cn(ui.track(), props.ui?.track)">
        <span v-if="showSteps" :class="cn(ui.steps(), props.ui?.steps)">
          <span
            v-for="idx in computedSteps"
            :key="idx"
            :style="{
              [orientation === 'horizontal' ? 'left' : 'top']: `calc(${idx - 1} * 10% + ${getThumbInBoundsOffset((idx - 1) * 10)}px)`,
            }"
            :class="cn(ui.step(), props.ui?.step)"
          />
        </span>
        <SliderRange :class="cn(ui.range(), props.ui?.range)" />
      </SliderTrack>

      <template v-for="idx in computedValues.length" :key="idx">
        <Tooltip
          :content="computedValues[idx - 1]?.toString()"
          :side="orientation === 'horizontal' ? 'top' : 'left'"
          disable-closing-trigger
          as-child
        >
          <SliderThumb
            :ref="thumbRef"
            :aria-pressed="toBoolAriaValue(pressed === idx)"
            :class="cn(ui.thumb(), props.ui?.thumb)"
            @pointerdown="handlePress(idx)"
            @pointerup="handlePress(null)"
          />
        </Tooltip>
      </template>
    </SliderRoot>

    <div v-if="!!showMarks" :class="cn(ui.marks(), props.ui?.marks)">
      <div
        :style="{
          [orientation === 'horizontal' ? 'left' : 'top']: `calc(0% + ${getThumbInBoundsOffset(0)}px)`,
        }"
        :class="cn(ui.mark(), props.ui?.mark)"
      >
        {{ !inverted ? min ?? 0 : max ?? 100 }}
      </div>
      <div
        :style="{
          [orientation === 'horizontal' ? 'left' : 'top']: `calc(50% + ${getThumbInBoundsOffset(50)}px)`,
        }"
        :class="cn(ui.mark(), props.ui?.mark)"
      >
        {{ (max ?? 100) / 2 }}
      </div>
      <div
        :style="{
          [orientation === 'horizontal' ? 'left' : 'top']: `calc(100% + ${getThumbInBoundsOffset(100)}px)`,
        }"
        :class="cn(ui.mark(), props.ui?.mark)"
      >
        {{ !inverted ? max ?? 100 : min ?? 0 }}
      </div>
    </div>
  </div>
</template>
