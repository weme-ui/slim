<script lang="ts" setup>
import type { SegmentedControlItem, SegmentedControlValue } from '../segmented-control.props'
import { ref } from 'vue'
import SegmentedControl from '../segmented-control.vue'

const items: SegmentedControlItem[] = [
  {
    label: 'Home',
    value: 'home',
    icon: 'ri:home-line',
    selectedIcon: 'ri:home-fill',
  },
  {
    label: 'Search',
    value: 'search',
    icon: 'ri:search-line',
    selectedIcon: 'ri:search-fill',
  },
  {
    label: 'Settings',
    value: 'settings',
    icon: 'ri:settings-line',
    selectedIcon: 'ri:settings-fill',
  },
]

const value = ref<SegmentedControlValue>('home')
</script>

<template>
  <SegmentedControl v-model="value" :items="items" />
</template>
