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
    <Listbox radius="none" :items="items" placeholder="None" />

    <Listbox radius="sm" :items="items" placeholder="SM" />

    <Listbox radius="md" :items="items" placeholder="MD" />

    <Listbox radius="lg" :items="items" placeholder="LG" />

    <Listbox radius="full" :items="items" placeholder="Full" />
  </div>
</template>
