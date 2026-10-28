<script lang="ts" setup>
import type { SelectItems } from '../select.props'
import Select from '../select.vue'

const items: SelectItems = [
  { label: 'Apple', value: 'apple', icon: 'ri:apple-line' },
  { label: 'Search', value: 'search', icon: 'ri:search-line' },
]
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Select
      prefix-icon="ri:search-line"
      suffix-icon="ri:sparkling-line"
      :items="items"
      placeholder="Select…"
    />

    <Select
      prefix="@"
      suffix=".com"
      :items="items"
      placeholder="handle"
    />
  </div>
</template>
