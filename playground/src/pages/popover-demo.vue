<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <Popover :dismissible="false">
    <Button>Open Popover</Button>
    <template #content>
      <div>
        <p>This is a popover content</p>
      </div>
    </template>
  </Popover>

  <Popover v-model:open="open">
    <template #anchor>
      <div class="size-40">
        <Button
          @click="
            () => {
              open = !open
            }
          "
          >Open Popover</Button
        >
      </div>
    </template>

    <template #content>
      <div>
        <p>This is a popover content</p>
      </div>
    </template>
  </Popover>
</template>
