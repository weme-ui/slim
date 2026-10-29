<script lang="ts" setup>
import ToggleButton from '../toggle-button.vue'
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <ToggleButton label="Soft" />
    <ToggleButton label="Outline" variant="outline" />
    <ToggleButton label="Ghost" variant="ghost" />
  </div>
</template>
