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
    <Autocomplete size="sm" :items="items" placeholder="Small" open-on-focus />

    <Autocomplete size="md" :items="items" placeholder="Medium" open-on-focus />

    <Autocomplete size="lg" :items="items" placeholder="Large" open-on-focus />
  </div>
</template>
