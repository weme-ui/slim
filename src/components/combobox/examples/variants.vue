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
    <Combobox variant="soft" :items="items" placeholder="Soft" />

    <Combobox variant="outline" :items="items" placeholder="Outline" />
  </div>
</template>
