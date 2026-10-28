<script lang="ts" setup>
import type { ListboxItems } from '../listbox.props'
import Listbox from '../listbox.vue'

const items: ListboxItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Listbox size="sm" :items="items" placeholder="Small" />

    <Listbox size="md" :items="items" placeholder="Medium" />

    <Listbox size="lg" :items="items" placeholder="Large" />
  </div>
</template>
