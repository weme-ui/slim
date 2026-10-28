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
    <Combobox radius="none" :items="items" placeholder="None" />

    <Combobox radius="sm" :items="items" placeholder="SM" />

    <Combobox radius="md" :items="items" placeholder="MD" />

    <Combobox radius="lg" :items="items" placeholder="LG" />

    <Combobox radius="full" :items="items" placeholder="Full" />
  </div>
</template>
