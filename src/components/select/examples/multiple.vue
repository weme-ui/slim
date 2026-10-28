<script lang="ts" setup>
import type { SelectItems } from '../select.props'
import Select from '../select.vue'

const items: SelectItems = [
  { label: 'Apple', value: 'apple', icon: 'ri:apple-line' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Durian', value: 'durian' },
]
</script>

<template>
  <div class="max-w-sm w-full">
    <Select
      multiple
      :items="items"
      prefix-icon="ri:apple-line"
      placeholder="Pick fruits…"
    />
  </div>
</template>
