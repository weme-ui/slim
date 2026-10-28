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
    <Select variant="soft" :items="items" placeholder="Soft" />

    <Select variant="outline" :items="items" placeholder="Outline" />
  </div>
</template>
