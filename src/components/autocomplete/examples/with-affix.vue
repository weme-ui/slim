<script lang="ts" setup>
import type { AutocompleteItems } from '../autocomplete.props'
import Autocomplete from '../autocomplete.vue'

const items: AutocompleteItems = [
  { label: 'Apple', value: 'apple', icon: 'ri:apple-line' },
  { label: 'Search', value: 'search', icon: 'ri:search-line' },
]
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Autocomplete
      prefix-icon="ri:search-line"
      suffix-icon="ri:sparkling-line"
      :items="items"
      placeholder="Search…"
      open-on-focus
    />

    <Autocomplete
      prefix="@"
      suffix=".com"
      :items="items"
      placeholder="handle"
      open-on-focus
    />
  </div>
</template>
