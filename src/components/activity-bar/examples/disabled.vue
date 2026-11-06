<script lang="ts" setup>
import type { ActivityBarGroup } from '../activity-bar.props'
import { ref } from 'vue'
import ConfigProvider from '../../config-provider/config-provider.vue'
import ActivityBar from '../activity-bar.vue'

const active = ref('home')

const groups = [
  {
    slot: 'content',
    items: [
      {
        id: 'home',
        label: 'Home',
        icon: 'ri:home-4-line',
        activeIcon: 'ri:home-4-fill',
      },
      {
        id: 'inbox',
        label: 'Inbox',
        icon: 'ri:inbox-line',
        activeIcon: 'ri:inbox-fill',
        disabled: true,
      },
    ],
  },
] satisfies ActivityBarGroup[]
</script>

<template>
  <div class="flex gap-3 items-center">
    <ConfigProvider>
      <ActivityBar v-model:active="active" :groups="groups" class="h-48" />
    </ConfigProvider>
  </div>
</template>
