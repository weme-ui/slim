<script lang="ts" setup>
const active = ref(false)
</script>

<template>
  <button @click="active = !active">
    <AnimatedToggleIcon icon="mingcute:left-line" variant="backward" :active="active" />
    <AnimatedToggleIcon icon="mingcute:heart-line" :active="active" />
    <AnimatedToggleIcon icon="mingcute:right-line" variant="forward" :active="active" />
  </button>
</template>
