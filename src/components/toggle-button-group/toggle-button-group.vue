<script lang="ts" setup>
import type { ToggleButtonGroupEmits, ToggleButtonGroupProps } from './toggle-button-group.props'
import { reactivePick } from '@vueuse/core'
import { ToggleGroupItem, ToggleGroupRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import ToggleButton from '../toggle-button/toggle-button.vue'
import { useToggleButtonGroupStyle } from './toggle-button-group.style'

const props = withDefaults(defineProps<ToggleButtonGroupProps>(), {
  variant: 'soft',
  size: 'md',
  radius: 'md',
  orientation: 'horizontal',
  scalable: true,
})

const emits = defineEmits<ToggleButtonGroupEmits>()
const delegated = reactivePick(props, 'as', 'asChild', 'defaultValue', 'dir', 'disabled', 'loop', 'modelValue', 'name', 'orientation', 'required', 'rovingFocus', 'type')
const forwarded = useForwardPropsEmits(delegated, emits)

const itemProps = reactivePick(props, 'variant', 'size', 'radius', 'scalable', 'unstyled')

const ui = computed(() => useToggleButtonGroupStyle({
  orientation: props.orientation,
}))
</script>

<template>
  <ToggleGroupRoot
    v-bind="forwarded"
    :data-slot="$attrs['data-slot'] || 'toggle-button-group'"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <ToggleGroupItem
      v-for="(item, index) in props.items"
      :key="index"
      :value="item.value"
      :disabled="item.disabled"
      :class="cn(ui.item(), props.ui?.item)"
      as-child
    >
      <ToggleButton
        v-bind="itemProps"
        :label="item.label"
        :icon="item.icon || icon"
        :active-icon="item.activeIcon || activeIcon"
        :ui="{
          icon: cn(ui.icon(), props.ui?.icon),
          label: cn(ui.label(), props.ui?.label),
        }"
      />
    </ToggleGroupItem>
  </ToggleGroupRoot>
</template>
