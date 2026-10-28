<script lang="ts" setup>
import type { AutocompleteItems } from '../autocomplete.props'
import Autocomplete from '../autocomplete.vue'

const items: AutocompleteItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <div class="max-w-sm w-full">
    <Autocomplete
      unstyled
      :items="items"
      placeholder="Fully custom…"
      open-on-focus
      class="text-sm py-1 outline-none border-b b-base w-full"
    />
  </div>
</template>
