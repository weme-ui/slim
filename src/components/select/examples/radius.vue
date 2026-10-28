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
    <Select radius="none" :items="items" placeholder="None" />

    <Select radius="sm" :items="items" placeholder="SM" />

    <Select radius="md" :items="items" placeholder="MD" />

    <Select radius="lg" :items="items" placeholder="LG" />

    <Select radius="full" :items="items" placeholder="Full" />
  </div>
</template>
