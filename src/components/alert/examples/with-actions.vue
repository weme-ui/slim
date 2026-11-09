<script lang="ts" setup>
import Button from '../../button/button.vue'
import Alert from '../alert.vue'
</script>

<template>
  <div class="flex items-center">
    <Alert title="Update available" description="A new version is ready." class="min-w-sm">
      <template #actions>
        <Button size="sm"> Details </Button>
      </template>
    </Alert>
  </div>
</template>
