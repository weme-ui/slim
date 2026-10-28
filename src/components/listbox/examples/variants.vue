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
    <Listbox variant="soft" :items="items" placeholder="Soft" />

    <Listbox variant="outline" :items="items" placeholder="Outline" />
  </div>
</template>
