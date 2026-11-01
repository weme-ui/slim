<script lang="ts" setup>
import ScrollArea from '../scroll-area.vue'

const types = [
  'hover',
  'always',
  'scroll',
  'auto',
  'glimpse',
] as const

const items = [
  'Apple',
  'Banana',
  'Blueberry',
  'Cherry',
  'Grape',
  'Lemon',
  'Mango',
  'Orange',
  'Peach',
  'Pear',
  'Pineapple',
  'Strawberry',
  'Watermelon',
]
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <ScrollArea
      v-for="type in types"
      :key="type"
      :type="type"
      class="h-48 w-40"
    >
      <div class="p-3 flex flex-col gap-2">
        <p
          v-for="item in items"
          :key="item"
          class="text-sm"
        >
          {{ item }}
        </p>
      </div>
    </ScrollArea>
  </div>
</template>
