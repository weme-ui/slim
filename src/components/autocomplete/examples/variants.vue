<script lang="ts" setup>
import type { AutocompleteItems } from '../autocomplete.props'
import Autocomplete from '../autocomplete.vue'

const items: AutocompleteItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Autocomplete variant="soft" :items="items" placeholder="Soft" open-on-focus />

    <Autocomplete variant="outline" :items="items" placeholder="Outline" open-on-focus />
  </div>
</template>
