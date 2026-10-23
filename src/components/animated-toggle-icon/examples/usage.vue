<script lang="ts" setup>
import { ref } from 'vue'
import AnimatedToggleIcon from '../animated-toggle-icon.vue'

const active = ref(false)
</script>

<template>
  <button
    type="button"
    class="text-sm inline-flex gap-2 items-center"
    @click="active = !active"
  >
    <AnimatedToggleIcon
      icon="ri:heart-line"
      active-icon="ri:heart-fill"
      :active="active"
      class="text-lg text-error"
    />
    Toggle
  </button>
</template>
