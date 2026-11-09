<script lang="ts" setup>
import IconTile from '../../icon-tile/icon-tile.vue'
import Alert from '../alert.vue'
</script>

<template>
  <div class="flex items-center">
    <Alert title="Reminder" description="Time to stand up." class="min-w-sm">
      <template #icon>
        <IconTile
          icon="ri:alarm-line"
          size="md"
          variant="frame"
          class="mr-md rounded-full size-8.5"
        />
      </template>
    </Alert>
  </div>
</template>
