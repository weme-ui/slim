<script lang="ts" setup>
import type { ToggleButtonGroupItem } from '../toggle-button-group.props'
import ToggleButtonGroup from '../toggle-button-group.vue'

const items: ToggleButtonGroupItem[] = [
  { label: 'List', value: 'list', icon: 'ri:list-unordered' },
  { label: 'Grid', value: 'grid', icon: 'ri:grid-line' },
  { label: 'Gallery', value: 'gallery', icon: 'ri:gallery-line' },
]
</script>

<template>
  <ToggleButtonGroup
    type="single"
    :items="items"
    default-value="list"
  />
</template>
