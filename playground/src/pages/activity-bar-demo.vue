<script lang="ts" setup>
import type { ActivityBarGroup } from '~/components/activity-bar/activity-bar.props'

const active = ref<string | undefined>(undefined)
const chipped = ref(true)
const groups = computed(() => [
  {
    slot: 'content',
    items: [
      {
        id: 'home',
        label: 'Home',
        tooltip: 'Go to home',
        icon: 'mingcute:home-1-line',
        activeIcon: 'mingcute:home-1-fill',
        class: 'data-[active]:text-clay',
      },
      {
        id: 'content',
        label: 'Content',
        icon: 'mingcute:layout-5-line',
        activeIcon: 'mingcute:layout-5-fill',
        class: 'data-[active]:text-accent',
        chipped: chipped.value,
        onActive: () => {
          setTimeout(() => {
            chipped.value = false
          }, 2000)
        },
      },
    ],
  },
  {
    slot: 'footer',
    items: [
      {
        id: 'settings',
        label: 'Settings',
        icon: 'mingcute:settings-1-line',
        activeIcon: 'mingcute:settings-1-fill',
      },
    ],
  },
] satisfies ActivityBarGroup[])
</script>

<template>
  <ConfigProvider>
    <ActivityBar v-model:active="active" :groups="groups" class="h-100" />
  </ConfigProvider>
</template>
