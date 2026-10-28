<script lang="ts" setup>
import type { SelectItems } from '../select.props'
import Select from '../select.vue'

const items: SelectItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <div class="max-w-sm w-full">
    <Select loading :items="items" placeholder="Loading…" />
  </div>
</template>
