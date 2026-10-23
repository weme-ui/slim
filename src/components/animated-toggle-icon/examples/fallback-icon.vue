<script lang="ts" setup>
import { ref } from 'vue'
import AnimatedToggleIcon from '../animated-toggle-icon.vue'

const active = ref(true)
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center"
    aria-label="Toggle"
    @click="active = !active"
  >
    <AnimatedToggleIcon
      icon="ri:star-line"
      :active="active"
      class="text-lg text-warning"
    />
  </button>
</template>
