<script lang="ts" setup>
import type { ListboxItems } from '../listbox.props'
import Listbox from '../listbox.vue'

const items: ListboxItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Durian', value: 'durian' },
]
</script>

<template>
  <div class="max-w-sm w-full">
    <Listbox
      multiple
      :items="items"
      placeholder="Pick fruits…"
    />
  </div>
</template>
