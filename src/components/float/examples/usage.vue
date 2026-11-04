<script lang="ts" setup>
import Avatar from '../../avatar/avatar.vue'
import Button from '../../button/button.vue'
import Icon from '../../icon/icon.vue'
import Float from '../float.vue'
</script>

<template>
  <div class="flex flex-wrap gap-8 items-center">
    <Avatar>
      <Float placement="top-right" offset="2px">
        <Icon name="ri:vip-crown-2-fill" class="text-yellow-10 rotate-40" aria-label="VIP" />
      </Float>
    </Avatar>

    <Button label="Click me" color="accent">
      <Float placement="top-right">
        <Icon name="ri:vip-crown-2-fill" class="text-yellow-10 rotate-40" aria-label="VIP" />
      </Float>
    </Button>
  </div>
</template>
