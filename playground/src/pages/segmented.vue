<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('1')
const items = ref([
  {
    label: 'Item 1',
    value: '1',
    icon: 'ri:home-line',
    selectedIcon: 'ri:home-fill',
    iconClass: 'data-[active]:text-accent',
  },
  {
    label: 'Item 2',
    value: '2',
    icon: 'ri:search-line',
    selectedIcon: 'ri:search-fill',
    iconClass: 'data-[active]:text-info',
  },
  {
    label: 'Item 3',
    value: '3',
    icon: 'ri:settings-line',
    selectedIcon: 'ri:settings-fill',
    iconClass: 'data-[active]:text-error',
  },
])
</script>

<template>
  <SegmentedControl
    v-model="value"
    orientation="vertical"
    :items="items"
  />
</template>
