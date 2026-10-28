<script lang="ts" setup>
import type { ComboboxItems } from '../combobox.props'
import Combobox from '../combobox.vue'

const items: ComboboxItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]
</script>

<template>
  <div class="max-w-sm w-full">
    <Combobox
      unstyled
      :items="items"
      placeholder="Fully custom…"
      class="text-sm py-1 outline-none border-b b-base w-full"
    />
  </div>
</template>
