<script lang="ts" setup>
import type { IconPickerEmits, IconPickerProps } from './icon-picker.props'
import { reactivePick, useVModel, useInfiniteScroll, refDebounced } from '@vueuse/core'
import {
  useForwardPropsEmits,
  VisuallyHidden,
  RovingFocusGroup,
  RovingFocusItem,
  useForwardExpose,
  useFilter,
} from 'reka-ui'
import { computed, onMounted, onUnmounted, ref, shallowRef, useTemplateRef, watch } from 'vue'
import { useFormFieldControl } from '~/composables/use-form-field-context'
import { useTheme } from '~/composables/use-theme'
import { toBoolAriaValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import ColorSwatchPicker from '../color-swatch-picker/color-swatch-picker.vue'
import Empty from '../empty/empty.vue'
import IconStack from '../icon-stack/icon-stack.vue'
import Icon from '../icon/icon.vue'
import Popover from '../popover/popover.vue'
import Switch from '../switch/switch.vue'
import Tooltip from '../tooltip/tooltip.vue'
import { useIconPickerStyle } from './icon-picker.style'

const props = withDefaults(defineProps<IconPickerProps>(), {
  triggerIcon: 'mingcute:emoji-line',
  emptyText: '请调整搜索条件以找到所需图标',
  placeholder: '搜索图标',
  filterIcon: 'mingcute:search-line',
})

const emits = defineEmits<IconPickerEmits>()
const delegated = reactivePick(props, 'content', 'portal', 'dismissible', 'reference')
const forwarded = useForwardPropsEmits(delegated, emits)

const modelValue = useVModel<IconPickerProps, 'modelValue', 'update:modelValue'>(
  props,
  'modelValue',
  emits,
  { defaultValue: props.defaultValue },
)

const { id, name, bindings, disabled, dataAttributes, registerControl } = useFormFieldControl(props)
const { forwardRef, currentElement } = useForwardExpose()
const { contains } = useFilter({ sensitivity: 'base' })
const { getThemeColorValue } = useTheme()

const el = useTemplateRef('el')

const isOpen = ref(false)
const isSettingsOpen = ref(false)
const isColorPickerOpen = ref(false)
const enableDefaultColor = ref(true)

const defaultColor = ref<string | 'default'>('default')
const selectedIcon = ref<string | undefined>(undefined)
const selectedColor = ref<string | undefined>(undefined)

const PAGE_SIZE = 70
const filterTerm = shallowRef('')
const debouncedFilterTerm = refDebounced(filterTerm, 200)
const count = ref(PAGE_SIZE)
const icons = computed(() =>
  props.icons ? props.icons.filter((icon) => contains(icon, debouncedFilterTerm.value)) : [],
)
const availableIcons = computed(() => icons.value.slice(0, count.value))

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

  isColorPickerOpen.value = false
  isSettingsOpen.value = false
})

useInfiniteScroll(
  el,
  () => {
    count.value += PAGE_SIZE
  },
  {
    distance: 200,
    canLoadMore: () => count.value < (props.icons?.length ?? 0),
  },
)

watch(isOpen, (value) => {
  if (value) {
    count.value = PAGE_SIZE
    el.value?.scrollTo({ top: 0 })
  }
})

watch(defaultColor, (value) => {
  if (enableDefaultColor.value) {
    selectedColor.value = value
  }
})

const ui = useIconPickerStyle()

function getColor(color: string) {
  return getThemeColorValue(color) || 'var(--text)'
}

function getOpenColorPicker(icon: string) {
  return !enableDefaultColor.value && selectedIcon.value === icon && isColorPickerOpen.value
}

function handleEnableDefaultColor(value: boolean) {
  if (value) {
    selectedColor.value = defaultColor.value
    console.log('enableDefaultColor', selectedColor.value)
  }
}

function handleSelectIcon(icon: string | undefined) {
  selectedIcon.value = icon

  if (!enableDefaultColor.value) {
    isColorPickerOpen.value = true
  } else {
    selectedColor.value = defaultColor.value
  }

  modelValue.value = {
    icon,
    color: selectedColor.value,
  }

  emits('change', modelValue.value)
}
</script>

<template>
  <Popover
    v-bind="forwarded"
    v-model:open="isOpen"
    :data-slot="$attrs['data-slot'] || 'icon-picker'"
    :ui="{
      content: cn(ui.popover(), props.ui?.popover),
    }"
    :style="{ '--swatch-color': getColor(defaultColor) }"
  >
    <template #anchor>
      <button
        type="button"
        :style="{ '--swatch-color': getColor(selectedColor ?? 'default') }"
        :class="cn(ui.trigger(), props.ui?.trigger)"
        @click="isOpen = true"
      >
        <slot>
          <Icon :name="selectedIcon || triggerIcon" />
        </slot>
      </button>
    </template>

    <template #content>
      <div :class="cn(ui.filter(), props.ui?.filter)">
        <Icon :name="filterIcon" :class="cn(ui.filterIcon(), props.ui?.filterIcon)" />
        <input
          v-model="filterTerm"
          type="text"
          :placeholder="placeholder"
          :class="cn(ui.filterInput(), props.ui?.filterInput)"
        />

        <Popover
          v-if="colors && colors.length > 0"
          v-model:open="isSettingsOpen"
          :ui="{
            content: cn(ui.colorSettings(), props.ui?.colorSettings),
          }"
        >
          <template #anchor>
            <Tooltip content="选择图标颜色" as-child>
              <button
                type="button"
                :data-mode="enableDefaultColor ? 'default' : 'pick'"
                :class="cn(ui.colorSettingsTrigger(), props.ui?.colorSettingsTrigger)"
                @click="isSettingsOpen = true"
              />
            </Tooltip>
          </template>

          <template #content>
            <ColorSwatchPicker
              v-model="defaultColor"
              size="sm"
              :disabled="!enableDefaultColor"
              :colors="colors"
              :class="cn(ui.colorSettingsSwatch(), props.ui?.colorSettingsSwatch)"
            />
            <div :class="cn(ui.colorSettingsMode(), props.ui?.colorSettingsMode)">
              <label :class="cn(ui.colorSettingsModeLabel(), props.ui?.colorSettingsModeLabel)">
                使用默认颜色
              </label>
              <Switch v-model="enableDefaultColor" size="sm" @change="handleEnableDefaultColor" />
            </div>
          </template>
        </Popover>
      </div>

      <div ref="el" :class="cn(ui.viewport(), props.ui?.viewport)">
        <RovingFocusGroup
          v-if="availableIcons.length > 0"
          v-bind="dataAttributes"
          role="radiogroup"
          :ref="forwardRef"
          :class="cn(ui.list(), props.ui?.list)"
        >
          <template v-for="icon in availableIcons" :key="icon">
            <Popover
              :open="getOpenColorPicker(icon)"
              :dismissible="false"
              @close:prevent="isColorPickerOpen = false"
            >
              <template #anchor>
                <RovingFocusItem
                  role="radio"
                  :active="selectedIcon === icon"
                  :aria-label="icon"
                  :class="cn(ui.item(), props.ui?.item)"
                  @click="handleSelectIcon(icon)"
                  @focus="handleSelectIcon(icon)"
                  @mousedown.left="
                    (event: MouseEvent) => {
                      if (!disabled && event.ctrlKey === false) {
                        handleSelectIcon(icon)
                      } else {
                        event.preventDefault()
                      }
                    }
                  "
                  @keydown.enter.space="handleSelectIcon(icon)"
                >
                  <Icon :name="icon" />
                </RovingFocusItem>
              </template>

              <template #content>
                <ColorSwatchPicker
                  v-model="selectedColor"
                  size="sm"
                  :colors="colors"
                  :class="cn(ui.colorSettingsSwatch(), props.ui?.colorSettingsSwatch)"
                >
                  <Icon :name="icon" class="text-$swatch-color" />
                </ColorSwatchPicker>
              </template>
            </Popover>
          </template>
        </RovingFocusGroup>

        <Empty
          v-else
          :description="emptyText"
          :class="cn(ui.empty(), props.ui?.empty)"
          :ui="{
            media: cn(ui.emptyIcon(), props.ui?.emptyIcon),
          }"
        >
          <template #media>
            <IconStack :icon="filterIcon" />
          </template>
        </Empty>
      </div>
    </template>

    <VisuallyHidden
      as="input"
      v-bind="bindings"
      :id="id"
      :name="name"
      :disabled="disabled"
      :aria-disabled="toBoolAriaValue(disabled)"
    />
  </Popover>
</template>
