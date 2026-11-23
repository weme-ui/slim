<script lang="ts" setup>
const size = ref<'sm' | 'md' | 'lg'>('md')
</script>

<template>
  <Modal
    icon="mingcute:add-circle-line"
    title="Modal Title"
    description="Modal Description"
    :size="size"
    side="right"
    loading
    closable
  >
    <Button :size="size">Open Modal</Button>

    <template #content>
      <p>Modal Content</p>
    </template>

    <template #footer="{ close }">
      <Button variant="soft" :size="size" @click="close">Cancel</Button>
      <Button :size="size" @click="close">Confirm</Button>
    </template>
  </Modal>
</template>
