<script lang="ts" setup>
import type { SelectItems } from '../select.props'
import Select from '../select.vue'

const items: SelectItems = [
  [
    { type: 'label', label: 'Fruits', value: 'fruits' },
    { label: 'Apple', value: 'apple', icon: 'ri:apple-line' },
    { label: 'Banana', value: 'banana' },
    { type: 'separator', value: 'sep-1' },
  ],
  [
    { type: 'label', label: 'Vegetables', value: 'vegetables' },
    { label: 'Carrot', value: 'carrot' },
    { label: 'Broccoli', value: 'broccoli' },
  ],
]
</script>

<template>
  <div class="max-w-sm w-full">
    <Select
      :items="items"
      placeholder="Select food…"
    />
  </div>
</template>
