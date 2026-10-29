<script lang="ts" setup>
import type { ToggleButtonEmits, ToggleButtonProps } from './toggle-button.props'
import { reactivePick } from '@vueuse/core'
import { Toggle, useForwardPropsEmits } from 'reka-ui'
import { computed, ref } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import AnimatedToggleIcon from '../animated-toggle-icon/animated-toggle-icon.vue'
import { useToggleButtonStyle } from './toggle-button.style'

const props = withDefaults(defineProps<ToggleButtonProps>(), {
  variant: 'soft',
  size: 'md',
  scalable: true,
})

const emits = defineEmits<ToggleButtonEmits>()
const delegated = reactivePick(props, 'as', 'asChild', 'defaultValue', 'disabled', 'modelValue', 'name', 'required')
const forwarded = useForwardPropsEmits(delegated, emits)

const pressed = ref(false)
const hasLabel = computed(() => !!props.label)

const ui = computed(() => useToggleButtonStyle({
  variant: props.variant,
  size: props.size,
  scalable: toBoolValue(props.scalable),
  unstyled: toBoolValue(props.unstyled),
  disabled: toBoolValue(props.disabled),
  hasLabel: hasLabel.value,
}))

function handlePress(value: boolean) {
  pressed.value = value
}
</script>

<template>
  <Toggle
    v-slot="{ state }"
    v-bind="forwarded"
    :data-slot="$attrs['data-slot'] || 'toggle-button'"
    :aria-pressed="pressed"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    @mousedown="handlePress(true)"
    @mouseup="handlePress(false)"
    @touchstart="handlePress(true)"
    @touchend="handlePress(false)"
  >
    <slot :state="state" :pressed="pressed">
      <AnimatedToggleIcon
        v-if="icon"
        data-slot="toggle-button-icon"
        :icon="icon"
        :active-icon="activeIcon"
        :active="state === 'on'"
        :class="cn(ui.icon(), props.ui?.icon)"
      />
      <span v-if="label" :class="cn(ui.label(), props.ui?.label)">
        {{ label }}
      </span>
    </slot>
  </Toggle>
</template>
