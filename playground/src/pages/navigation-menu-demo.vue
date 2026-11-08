<script lang="ts" setup>
import type { NavigationMenuItem } from '~/components/navigation-menu/navigation-menu-item.props'

const items = [
  [
    {
      type: 'label',
      label: 'Management',
      icon: 'mingcute:tool-line',
      children: [
        {
          type: 'link',
          label: 'Users',
          icon: 'mingcute:user-3-line',
          to: '/users',
          chip: true,
        },
        {
          type: 'link',
          label: 'Roles',
          icon: 'mingcute:safe-lock-line',
          to: '/roles',
          badge: '10',
        },
        {
          type: 'link',
          label: 'Google',
          icon: 'mingcute:google-line',
          to: 'https://www.google.com',
        },
        {
          id: 'slot-link',
          type: 'link',
          label: 'Github',
          to: 'https://github.com',
          icon: 'mingcute:github-line',
          disabled: true,
        },
      ],
    },

    {
      label: 'Separator',
      type: 'separator',
    },

    {
      type: 'label',
      label: 'Management',
      icon: 'mingcute:tool-line',
      children: [
        {
          type: 'link',
          label: 'Users',
          icon: 'mingcute:user-3-line',
          to: '/users-1',
          badge: {
            label: '10',
            color: 'default',
          },
        },
        {
          type: 'link',
          label: 'Roles',
          icon: 'mingcute:safe-lock-line',
          to: '/roles',
          chip: {
            variant: 'accent',
          },
        },
      ],
    },
  ],

  [
    {
      type: 'separator',
      label: 'Separator',
    },
  ],

  [
    {
      type: 'link',
      label: 'Roles',
      icon: 'mingcute:safe-lock-line',
      to: '/roles',
      badge: {
        label: '10',
        color: 'accent',
      },
    },
  ],

  [
    {
      type: 'separator',
      label: 'Separator',
    },
  ],

  [
    {
      type: 'label',
      label: 'Management',
      icon: 'mingcute:tool-line',
      children: [
        {
          type: 'link',
          label: 'Users',
          icon: 'mingcute:user-3-line',
          to: '/users-1',
          badge: {
            label: '10',
            color: 'default',
          },
        },
        {
          id: 'roles',
          type: 'label',
          label: 'Roles',
          icon: 'mingcute:safe-lock-line',
          to: '/roles',
          children: [
            {
              type: 'link',
              label: 'Add role',
              to: '/roles/add',
            },
          ],
        },
      ],
    },
  ],
] satisfies NavigationMenuItem[][]
</script>

<template>
  <NavigationMenu :items="items" default-active="/users" class="w-60">
    <template #append-slot-link>
      <Icon name="mingcute:loading-3-line" class="text-neutral-12 animate-spin" />
    </template>

    <template #append-roles>
      <Button size="sm" variant="ghost" icon="mingcute:add-line" class="px-0 w-6" />
    </template>
  </NavigationMenu>
</template>
