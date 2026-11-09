<script lang="ts" setup>
import type { NavigationMenuItem } from '../navigation-menu-item.props'
import NavigationMenu from '../navigation-menu.vue'

const items = [
  {
    label: 'Settings',
    to: '/settings',
    icon: 'ri:settings-3-line',
    children: [
      {
        label: 'Roles',
        to: '/roles',
        children: [{ label: 'Add role', to: '/roles/add' }],
      },
    ],
  },
] satisfies NavigationMenuItem[]
</script>

<template>
  <div class="flex gap-3 items-center">
    <NavigationMenu :items="items" default-active="/roles" class="w-56" />
  </div>
</template>
