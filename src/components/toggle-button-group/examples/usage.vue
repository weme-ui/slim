<script lang="ts" setup>
import type { ToggleButtonGroupItem } from '../toggle-button-group.props'
import ToggleButtonGroup from '../toggle-button-group.vue'

const items: ToggleButtonGroupItem[] = [
  { icon: 'ri:align-left', value: 'left' },
  { icon: 'ri:align-center', value: 'center' },
  { icon: 'ri:align-right', value: 'right' },
]
</script>

<template>
  <ToggleButtonGroup
    type="single"
    default-value="left"
    :items="items"
  />
</template>
