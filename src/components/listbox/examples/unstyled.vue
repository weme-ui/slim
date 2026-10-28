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
      unstyled
      :items="items"
      placeholder="Fully custom…"
      class="text-sm w-full"
    />
  </div>
</template>
