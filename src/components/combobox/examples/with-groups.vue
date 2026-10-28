<script lang="ts" setup>
import type { ComboboxItems } from '../combobox.props'
import Combobox from '../combobox.vue'

const items: ComboboxItems = [
  [
    { type: 'label', label: 'Fruits', value: 'fruits' },
    { label: 'Apple', value: 'apple', icon: 'ri:apple-line' },
    { label: 'Banana', value: 'banana' },
    { type: 'separator', value: 'sep-1' },
  ],
  [
    { type: 'label', label: 'Vegetables', value: 'vegetables' },
    { label: 'Carrot', value: 'carrot' },
    { label: 'Broccoli', value: 'broccoli' },
  ],
]
</script>

<template>
  <div class="max-w-sm w-full">
    <Combobox
      :items="items"
      placeholder="Search food…"
    />
  </div>
</template>
