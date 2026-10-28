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
    <Listbox :items="items" placeholder="Default" />
    <Listbox invalid :items="items" placeholder="Invalid" />
  </div>
</template>
