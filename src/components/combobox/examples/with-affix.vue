<script lang="ts" setup>
import type { ComboboxItems } from '../combobox.props'
import Combobox from '../combobox.vue'

const items: ComboboxItems = [
  { label: 'Apple', value: 'apple', icon: 'ri:apple-line' },
  { label: 'Search', value: 'search', icon: 'ri:search-line' },
]
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Combobox
      prefix-icon="ri:search-line"
      suffix-icon="ri:sparkling-line"
      :items="items"
      placeholder="Search…"
    />

    <Combobox
      prefix="@"
      suffix=".com"
      :items="items"
      placeholder="handle"
    />
  </div>
</template>
