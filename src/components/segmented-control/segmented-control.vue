<script lang="ts" setup>
import type {
  SegmentedControlEmits,
  SegmentedControlItem,
  SegmentedControlProps,
  SegmentedControlValue,
} from './segmented-control.props'
import { reactivePick, useResizeObserver, useVModel } from '@vueuse/core'
import {
  RovingFocusGroup,
  RovingFocusItem,
  useForwardExpose,
  useForwardPropsEmits,
  VisuallyHidden,
} from 'reka-ui'
import { computed, onMounted, onUnmounted, ref, watch, watchPostEffect } from 'vue'
import { useFormFieldControl } from '~/composables/use-form-field-context'
import { toBoolAriaValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import AnimatedToggleIcon from '../animated-toggle-icon/animated-toggle-icon.vue'
import { useSegmentedControlStyle } from './segmented-control.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SegmentedControlProps>(), {
  orientation: 'horizontal',
  size: 'md',
})

const emits = defineEmits<SegmentedControlEmits>()
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
const modelValue = useVModel<SegmentedControlProps, 'modelValue', 'update:modelValue'>(
  props,
  'modelValue',
  emits,
  { defaultValue: props.defaultValue },
)

const { id, name, bindings, disabled, dataAttributes, registerControl } = useFormFieldControl(props)

const ui = computed(() =>
  useSegmentedControlStyle({
    orientation: props.orientation,
    size: props.size,
    disabled: disabled.value,
  }),
)

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

const itemElements = ref<HTMLButtonElement[]>([])
const indicatorStyles = ref<{ size: number | null; offset: number | null }>({
  size: null,
  offset: null,
})

watchPostEffect(() => {
  itemElements.value = Array.from(
    currentElement.value?.querySelectorAll<HTMLButtonElement>(
      '[data-slot="segmented-control-item"]',
    ) || [],
  )
})

useResizeObserver(itemElements, () => {
  updateIndicatorStyles()
})

watch([modelValue, () => props.items], () => updateIndicatorStyles(), {
  immediate: true,
  flush: 'post',
})

function getState(val: SegmentedControlValue) {
  return val === modelValue.value ? 'checked' : 'unchecked'
}

function updateIndicatorStyles() {
  const checked = currentElement.value?.querySelector<HTMLButtonElement>('[data-state="checked"]')

  if (!checked) return

  indicatorStyles.value =
    props.orientation === 'horizontal'
      ? {
          size: checked.offsetWidth,
          offset: checked.offsetLeft,
        }
      : {
          size: checked.offsetHeight,
          offset: checked.offsetTop,
        }
}

function handleSelect(item: SegmentedControlItem) {
  if (item.disabled || disabled.value || modelValue.value === item.value) return

  if (item.onSelect) item.onSelect(item.value)

  modelValue.value = item.value
  emits('change', item.value)
}
</script>

<template>
  <RovingFocusGroup
    v-bind="{ id, name, ...forwarded, ...dataAttributes }"
    :ref="forwardRef"
    role="radiogroup"
    :data-slot="$attrs['data-slot'] || 'segmented-control'"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <template v-for="(item, index) in items" :key="index">
      <RovingFocusItem
        data-slot="segmented-control-item"
        role="radio"
        :focusable="!disabled && !item.disabled"
        :active="modelValue === item.value"
        :disabled="item.disabled || disabled"
        :data-state="getState(item.value)"
        :aria-label="item.label"
        :aria-checked="getState(item.value) === 'checked'"
        :class="cn(ui.item(), props.ui?.item, item.class)"
        @focus="handleSelect(item)"
        @click="handleSelect(item)"
        @mousedown.left="
          (event: MouseEvent) => {
            if (!disabled && !item.disabled && event.ctrlKey === false) {
              handleSelect(item)
            } else {
              event.preventDefault()
            }
          }
        "
        @keydown.enter.space="handleSelect(item)"
      >
        <slot :item="item" :state="getState(item.value)" :value="modelValue">
          <slot
            v-if="item.icon || $slots.icon"
            name="icon"
            :item="item"
            :state="getState(item.value)"
            :value="modelValue"
          >
            <AnimatedToggleIcon
              v-if="item.icon"
              :icon="item.icon"
              :active-icon="item.selectedIcon"
              :active="getState(item.value) === 'checked'"
              :class="cn(ui.icon(), props.ui?.icon, item.iconClass)"
            />
          </slot>

          <slot
            v-if="item.label || $slots.label"
            name="label"
            :item="item"
            :state="getState(item.value)"
            :value="modelValue"
          >
            <span :class="cn(ui.label(), props.ui?.label)" :data-state="getState(item.value)">
              {{ item.label }}
            </span>
          </slot>

          <slot name="append" :item="item" :state="getState(item.value)" :value="modelValue" />
        </slot>
      </RovingFocusItem>
    </template>

    <div
      :data-orientation="orientation"
      :style="{
        '--indicator-size': `${indicatorStyles.size}px`,
        '--indicator-offset': `${indicatorStyles.offset}px`,
      }"
      :class="cn(ui.indicator(), props.ui?.indicator)"
    />
  </RovingFocusGroup>

  <VisuallyHidden
    as="input"
    v-bind="bindings"
    :name="name"
    :disabled="disabled"
    :aria-disabled="toBoolAriaValue(disabled)"
  />
</template>
