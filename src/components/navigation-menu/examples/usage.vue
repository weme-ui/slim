<script lang="ts" setup>
import type { NavigationMenuItem } from '../navigation-menu-item.props'
import NavigationMenu from '../navigation-menu.vue'

const items = [
  { type: 'label', label: 'General', icon: 'ri:list-check' },
  {
    label: 'Home',
    to: '/home',
    icon: 'ri:home-4-line',
    activeIcon: 'ri:home-4-fill',
  },
  {
    label: 'Inbox',
    to: '/inbox',
    icon: 'ri:inbox-line',
  },
] satisfies NavigationMenuItem[]
</script>

<template>
  <div class="flex gap-3 items-center">
    <NavigationMenu :items="items" default-active="/home" class="w-56" />
  </div>
</template>
