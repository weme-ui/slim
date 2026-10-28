<script lang="ts" setup>
import type { ComboboxItems } from '../combobox.props'
import Combobox from '../combobox.vue'

const items: ComboboxItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Combobox size="sm" :items="items" placeholder="Small" />

    <Combobox size="md" :items="items" placeholder="Medium" />

    <Combobox size="lg" :items="items" placeholder="Large" />
  </div>
</template>
