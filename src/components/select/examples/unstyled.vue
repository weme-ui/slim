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
    <Select
      unstyled
      :items="items"
      placeholder="Fully custom…"
      class="text-sm py-1 outline-none border-b b-base w-full"
    />
  </div>
</template>
