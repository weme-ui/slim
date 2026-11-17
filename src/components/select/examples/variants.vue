<script lang="ts" setup>
import type { SelectItems, SelectValue } from '../select.props'
import { ref } from 'vue'
import Select from '../select.vue'

const items: SelectItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]

const select = ref<SelectValue | undefined>(undefined)
</script>

<template>
  <div class="flex flex-col gap-3 max-w-sm w-full">
    <Select variant="soft" :items="items" placeholder="Soft" v-model="select" />

    <Select variant="outline" :items="items" placeholder="Outline" v-model="select" />
  </div>
</template>
