<script lang="ts" setup>
import type { ToggleButtonGroupItem } from '../toggle-button-group.props'
import ToggleButtonGroup from '../toggle-button-group.vue'

const items: ToggleButtonGroupItem[] = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
]
</script>

<template>
  <div class="flex flex-col gap-6 items-start">
    <ToggleButtonGroup
      type="single"
      variant="soft"
      :items="items"
      default-value="left"
    />
    <ToggleButtonGroup
      type="single"
      variant="outline"
      :items="items"
      default-value="left"
    />
    <ToggleButtonGroup
      type="single"
      variant="ghost"
      :items="items"
      default-value="left"
    />
  </div>
</template>
