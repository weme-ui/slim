<script lang="ts" setup>
import ToggleButton from '../toggle-button.vue'
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <ToggleButton
      label="Mute"
      icon="ri:volume-mute-line"
      active-icon="ri:volume-up-line"
    />
    <ToggleButton
      icon="ri:heart-line"
      active-icon="ri:heart-fill"
      aria-label="Favorite"
      :ui="{
        icon: 'data-[active]:text-ruby',
      }"
    />
  </div>
</template>
