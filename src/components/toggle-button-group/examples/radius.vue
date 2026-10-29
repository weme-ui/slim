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
      radius="none"
      :items="items"
      default-value="left"
    />
    <ToggleButtonGroup
      type="single"
      radius="xs"
      :items="items"
      default-value="left"
    />
    <ToggleButtonGroup
      type="single"
      radius="sm"
      :items="items"
      default-value="left"
    />
    <ToggleButtonGroup
      type="single"
      radius="md"
      :items="items"
      default-value="left"
    />
    <ToggleButtonGroup
      type="single"
      radius="lg"
      :items="items"
      default-value="left"
    />
    <ToggleButtonGroup
      type="single"
      radius="xl"
      :items="items"
      default-value="left"
    />
    <ToggleButtonGroup
      type="single"
      radius="full"
      :items="items"
      default-value="left"
    />
  </div>
</template>
