<script lang="ts" setup>
import type { NavigationMenuItem } from '../navigation-menu-item.props'
import NavigationMenu from '../navigation-menu.vue'

const items = [
  { label: 'Home', to: '/home', icon: 'ri:home-4-line' },
  {
    label: 'Archive',
    to: '/archive',
    icon: 'ri:archive-line',
    disabled: true,
  },
] satisfies NavigationMenuItem[]
</script>

<template>
  <div class="flex gap-3 items-center">
    <NavigationMenu :items="items" default-active="/home" class="w-56" />
  </div>
</template>
