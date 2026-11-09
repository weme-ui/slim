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
  <div class="flex items-center">
    <ScrollArea class="h-48 w-48">
      <div class="p-3 flex flex-col gap-2">
        <p v-for="item in items" :key="item" class="text-sm">
          {{ item }}
        </p>
      </div>
    </ScrollArea>
  </div>
</template>
