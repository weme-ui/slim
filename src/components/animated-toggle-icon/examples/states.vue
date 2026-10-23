<script lang="ts" setup>
import AnimatedToggleIcon from '../animated-toggle-icon.vue'
</script>

<template>
  <div class="text-lg flex flex-wrap gap-6 items-center">
    <AnimatedToggleIcon icon="ri:checkbox-blank-circle-line" active-icon="ri:checkbox-circle-fill" :active="false" />
    <AnimatedToggleIcon icon="ri:checkbox-blank-circle-line" active-icon="ri:checkbox-circle-fill" :active="true" />
  </div>
</template>
