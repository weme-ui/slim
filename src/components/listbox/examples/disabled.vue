<script lang="ts" setup>
import type { ListboxItems } from '../listbox.props'
import Listbox from '../listbox.vue'

const items: ListboxItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <div class="max-w-sm w-full">
    <Listbox
      disabled
      :items="items"
      placeholder="Disabled"
    />
  </div>
</template>
