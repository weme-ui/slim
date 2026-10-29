<script lang="ts" setup>
import type { ToggleButtonGroupItem } from '../toggle-button-group.props'
import ToggleButtonGroup from '../toggle-button-group.vue'

const items: ToggleButtonGroupItem[] = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
]

const withDisabledItem: ToggleButtonGroupItem[] = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center', disabled: true },
  { label: 'Right', value: 'right' },
]
</script>

<template>
  <div class="flex flex-col gap-6 items-start">
    <ToggleButtonGroup
      type="single"
      disabled
      :items="items"
      default-value="left"
    />
    <ToggleButtonGroup
      type="single"
      :items="withDisabledItem"
      default-value="left"
    />
  </div>
</template>
