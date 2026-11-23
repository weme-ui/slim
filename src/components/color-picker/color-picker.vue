<script lang="ts" setup>
import type { ColorPickerEmits, ColorPickerProps } from './color-picker.props'
import { reactivePick } from '@vueuse/core'
import {
  ColorAreaArea,
  ColorAreaRoot,
  ColorAreaThumb,
  ColorFieldInput,
  ColorFieldRoot,
  ColorSliderRoot,
  ColorSliderThumb,
  ColorSliderTrack,
  ColorSwatch,
  colorToString,
  normalizeColor,
  useForwardExpose,
  useForwardPropsEmits,
  type Color,
} from 'reka-ui'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useFormFieldControl } from '~/composables/use-form-field-context'
import { cn } from '~/utils/styles'
import Popover from '../popover/popover.vue'
import { useColorPickerStyle } from './color-picker.style'

const props = withDefaults(defineProps<ColorPickerProps>(), {
  defaultValue: '#f00',
  size: 'sm',
  radius: 'md',
})

const emits = defineEmits<ColorPickerEmits>()
const delegated = reactivePick(props, 'content', 'portal', 'dismissible', 'reference')
const forwarded = useForwardPropsEmits(delegated, emits)

const modelValue = defineModel<string>()

const open = ref(false)
const colorValue = ref<Color>(normalizeColor(modelValue.value ?? props.defaultValue))

const { id, name, disabled, registerControl } = useFormFieldControl(props)
const { forwardRef, currentElement } = useForwardExpose()

let unregister: (() => void) | undefined

onMounted(() => {
  unregister = registerControl({
    id: () => id.value,
    element: () => currentElement.value,
    getValue: () => colorValue.value,
  })
})

onUnmounted(() => {
  unregister?.()
})

const ui = computed(() =>
  useColorPickerStyle({
    size: props.size,
    radius: props.radius,
    disabled: disabled.value,
  }),
)

watch(
  () => props.defaultValue,
  (value) => {
    colorValue.value = normalizeColor(value)
  },
  { immediate: true },
)

watch(colorValue, (value) => {
  modelValue.value = colorToString(value, 'hex')
})

function handleColorUpdate(color: Color) {
  colorValue.value = color
}

function handleHexUpdate(hex: string) {
  colorValue.value = normalizeColor(hex)
}
</script>

<template>
  <Popover
    v-bind="forwarded"
    v-model:open="open"
    :data-slot="$attrs['data-slot'] || 'color-picker'"
    :ui="{
      content: cn(ui.container(), props.ui?.container),
    }"
  >
    <template #anchor>
      <div :class="cn(ui.anchor(), props.ui?.anchor)" @click="open = !open">
        <ColorSwatch :color="modelValue" :class="cn(ui.anchorSwatch(), props.ui?.anchorSwatch)" />
        <slot :value="modelValue">
          <span :class="cn(ui.anchorText(), props.ui?.anchorText)">{{ modelValue }}</span>
        </slot>
      </div>
    </template>

    <template #content>
      <ColorAreaRoot
        v-slot="{ style }"
        color-space="hsl"
        x-channel="saturation"
        y-channel="lightness"
        :model-value="colorValue"
        :class="cn(ui.colorAreaWrapper(), props.ui?.colorAreaWrapper)"
        @update:color="handleColorUpdate"
      >
        <ColorAreaArea :style="style" :class="cn(ui.colorArea(), props.ui?.colorArea)">
          <ColorAreaThumb :class="cn(ui.colorAreaThumb(), props.ui?.colorAreaThumb)" />
        </ColorAreaArea>
      </ColorAreaRoot>

      <div :class="cn(ui.sliderWrapper(), props.ui?.sliderWrapper)">
        <div :class="cn(ui.sliderSwatchWrapper(), props.ui?.sliderSwatchWrapper)">
          <ColorSwatch :color="modelValue" :class="cn(ui.sliderSwatch(), props.ui?.sliderSwatch)" />
        </div>

        <div :class="cn(ui.sliders(), props.ui?.sliders)">
          <ColorSliderRoot
            channel="hue"
            color-space="hsl"
            :model-value="colorValue"
            :class="cn(ui.slider(), props.ui?.slider)"
            @update:color="handleColorUpdate"
          >
            <ColorSliderTrack :class="cn(ui.sliderTrack(), props.ui?.sliderTrack)" />
            <ColorSliderThumb :class="cn(ui.sliderThumb(), props.ui?.sliderThumb)" />
          </ColorSliderRoot>

          <ColorSliderRoot
            channel="alpha"
            color-space="hsl"
            data-channel="alpha"
            :model-value="colorValue"
            :class="cn(ui.slider(), props.ui?.slider)"
            @update:color="handleColorUpdate"
          >
            <ColorSliderTrack :class="cn(ui.sliderTrack(), props.ui?.sliderTrack)" />
            <ColorSliderThumb :class="cn(ui.sliderThumb(), props.ui?.sliderThumb)" />
          </ColorSliderRoot>
        </div>
      </div>

      <div :class="cn(ui.fieldWrapper(), props.ui?.fieldWrapper)">
        <ColorFieldRoot
          :model-value="modelValue"
          :class="cn(ui.field(), props.ui?.field, 'col-span-2')"
          @update:model-value="handleHexUpdate"
        >
          <ColorFieldInput
            :id="id"
            :name="name"
            :ref="forwardRef"
            :class="cn(ui.fieldInput(), props.ui?.fieldInput, 'text-left')"
          />
        </ColorFieldRoot>

        <ColorFieldRoot
          channel="red"
          color-space="rgb"
          :model-value="colorValue"
          :class="cn(ui.field(), props.ui?.field)"
          @update:color="handleColorUpdate"
        >
          <ColorFieldInput :class="cn(ui.fieldInput(), props.ui?.fieldInput)" />
        </ColorFieldRoot>

        <ColorFieldRoot
          channel="green"
          color-space="rgb"
          :model-value="colorValue"
          :class="cn(ui.field(), props.ui?.field)"
          @update:color="handleColorUpdate"
        >
          <ColorFieldInput :class="cn(ui.fieldInput(), props.ui?.fieldInput)" />
        </ColorFieldRoot>

        <ColorFieldRoot
          channel="blue"
          color-space="rgb"
          :model-value="colorValue"
          :class="cn(ui.field(), props.ui?.field)"
          @update:color="handleColorUpdate"
        >
          <ColorFieldInput :class="cn(ui.fieldInput(), props.ui?.fieldInput)" />
        </ColorFieldRoot>
      </div>
    </template>
  </Popover>
</template>
