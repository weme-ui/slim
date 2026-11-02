<script lang="ts" setup>
import type { KbdProps } from './kbd.props'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { useKbd } from '~/composables/use-kbd'
import { cn } from '~/utils/styles'
import { useKbdStyle } from './kbd.style'

const props = withDefaults(defineProps<KbdProps>(), {
  as: 'kbd',
  variant: 'soft',
  size: 'md',
})

const { getKbdKey } = useKbd()

const keys = computed(() => {
  if (typeof props.value === 'string') {
    return getKbdKey(props.value)
  }

  if (Array.isArray(props.value)) {
    return props.value.map(getKbdKey).flat()
  }

  return []
})

const ui = computed(() => useKbdStyle({
  variant: props.variant,
  size: props.size,
}))
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(ui, props.class)">
    <template v-for="key in keys" :key="key">
      {{ key }}
    </template>
  </Primitive>
</template>
