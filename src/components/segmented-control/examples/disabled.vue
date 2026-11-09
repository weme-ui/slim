<script lang="ts" setup>
import type { SegmentedControlItem, SegmentedControlValue } from '../segmented-control.props'
import { ref } from 'vue'
import SegmentedControl from '../segmented-control.vue'

const items: SegmentedControlItem[] = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
]

const withDisabledItem: SegmentedControlItem[] = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week', disabled: true },
  { label: 'Month', value: 'month' },
]

const disabledValue = ref<SegmentedControlValue>('week')
const value = ref<SegmentedControlValue>('day')
</script>

<template>
  <div class="flex flex-col gap-6 items-start">
    <SegmentedControl v-model="disabledValue" disabled :items="items" />
    <SegmentedControl v-model="value" :items="withDisabledItem" />
  </div>
</template>
