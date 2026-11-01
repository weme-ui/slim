<script lang="ts" setup>
import ScrollArea from '../scroll-area.vue'

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
      orientation="vertical"
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
    <ScrollArea
      orientation="horizontal"
      class="w-64"
    >
      <div class="p-3 flex gap-3 w-max">
        <p
          v-for="item in items"
          :key="item"
          class="text-sm whitespace-nowrap"
        >
          {{ item }}
        </p>
      </div>
    </ScrollArea>
  </div>
</template>
