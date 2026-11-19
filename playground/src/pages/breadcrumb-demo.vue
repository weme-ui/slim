<script lang="ts" setup>
const items = [
  { label: 'Home', to: '/', icon: 'ri:home-line' },
  { label: 'Library', to: '/library', icon: 'ri:book-line' },
  { label: 'Data', to: '/data', icon: 'ri:database-line', disabled: true },
  { label: 'Data', to: '/data' },
  { label: 'Applications', to: '/applications', icon: 'ri:apps-line' },
]
</script>

<template>
  <Breadcrumb :items="items" class="text-sm" />
</template>
