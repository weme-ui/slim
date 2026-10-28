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
    <Autocomplete radius="none" :items="items" placeholder="None" open-on-focus />

    <Autocomplete radius="sm" :items="items" placeholder="SM" open-on-focus />

    <Autocomplete radius="md" :items="items" placeholder="MD" open-on-focus />

    <Autocomplete radius="lg" :items="items" placeholder="LG" open-on-focus />

    <Autocomplete radius="full" :items="items" placeholder="Full" open-on-focus />
  </div>
</template>
