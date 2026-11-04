<script lang="ts" setup>
</script>

<template>
  <div class="flex relative">
    <Avatar />
    <Float placement="top-right" offset="2px">
      <Icon name="ri:vip-crown-2-fill" class="text-yellow-10 rotate-40" />
    </Float>
  </div>

  <Avatar>
    <Float placement="top-right" offset="2px">
      <Icon name="ri:vip-crown-2-fill" class="text-yellow-10 rotate-40" />
    </Float>
  </Avatar>

  <div class="flex relative">
    <Button label="Click me" color="accent" />
    <Float placement="top-right">
      <Icon name="ri:vip-crown-2-fill" class="text-yellow-10 rotate-40" />
    </Float>
  </div>

  <Button label="Click me" color="accent">
    <Float placement="top-right">
      <Icon name="ri:vip-crown-2-fill" class="text-yellow-10 rotate-40" />
    </Float>
  </Button>
</template>
