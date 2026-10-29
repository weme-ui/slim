<script lang="ts" setup>
import type { RadioGroupItem } from '../radio-group.props'
import { ref } from 'vue'
import RadioGroup from '../radio-group.vue'

const items: RadioGroupItem[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
]

const value = ref('a')
const size = 'lg'
</script>

<template>
  <div class="flex flex-col gap-6 max-w-sm w-full">
    <RadioGroup v-model="value" radius="none" :size="size" :items="items" />
    <RadioGroup v-model="value" radius="xs" :size="size" :items="items" />
    <RadioGroup v-model="value" radius="sm" :size="size" :items="items" />
    <RadioGroup v-model="value" radius="md" :size="size" :items="items" />
    <RadioGroup v-model="value" radius="lg" :size="size" :items="items" />
    <RadioGroup v-model="value" radius="xl" :size="size" :items="items" />
    <RadioGroup v-model="value" radius="full" :size="size" :items="items" />
  </div>
</template>
