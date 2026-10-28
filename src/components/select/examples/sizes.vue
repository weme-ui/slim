<script lang="ts" setup>
import type { SelectItems } from '../select.props'
import Select from '../select.vue'

const items: SelectItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Select size="sm" :items="items" placeholder="Small" />

    <Select size="md" :items="items" placeholder="Medium" />

    <Select size="lg" :items="items" placeholder="Large" />
  </div>
</template>
