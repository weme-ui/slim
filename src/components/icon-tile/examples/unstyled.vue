<script lang="ts" setup>
import IconTile from '../icon-tile.vue'
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <IconTile
      icon="ri:bookmark-line"
      :unstyled="true"
      class="bg-blue-8 text-white-12 rounded-md size-10"
    />
    <IconTile
      icon="ri:star-line"
      :unstyled="true"
      class="bg-green-8 text-white-12 rounded-full size-10"
    />
    <IconTile
      icon="ri:heart-line"
      :unstyled="true"
      class="b-red-8 text-red-10 b rounded-lg size-10"
    />
  </div>
</template>
