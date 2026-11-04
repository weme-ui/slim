<script lang="ts" setup>
import type { SegmentedControlItem, SegmentedControlValue } from '../segmented-control.props'
import { ref } from 'vue'
import SegmentedControl from '../segmented-control.vue'

const items: SegmentedControlItem[] = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
]

const sm = ref<SegmentedControlValue>('week')
const md = ref<SegmentedControlValue>('week')
const lg = ref<SegmentedControlValue>('week')
</script>

<template>
  <div class="flex flex-col gap-6 items-start">
    <SegmentedControl
      v-model="sm"
      size="sm"
      :items="items"
    />
    <SegmentedControl
      v-model="md"
      size="md"
      :items="items"
    />
    <SegmentedControl
      v-model="lg"
      size="lg"
      :items="items"
    />
  </div>
</template>
