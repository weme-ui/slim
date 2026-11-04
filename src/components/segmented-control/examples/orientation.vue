<script lang="ts" setup>
import type { SegmentedControlItem, SegmentedControlValue } from '../segmented-control.props'
import { ref } from 'vue'
import SegmentedControl from '../segmented-control.vue'

const items: SegmentedControlItem[] = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
]

const horizontal = ref<SegmentedControlValue>('week')
const vertical = ref<SegmentedControlValue>('week')
</script>

<template>
  <div class="flex flex-wrap gap-6 items-start">
    <SegmentedControl
      v-model="horizontal"
      orientation="horizontal"
      :items="items"
    />
    <SegmentedControl
      v-model="vertical"
      orientation="vertical"
      :items="items"
    />
  </div>
</template>
