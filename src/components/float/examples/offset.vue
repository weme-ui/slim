<script lang="ts" setup>
import Avatar from '../../avatar/avatar.vue'
import Icon from '../../icon/icon.vue'
import Float from '../float.vue'
</script>

<template>
  <div class="flex flex-wrap gap-8 items-center">
    <div class="flex relative">
      <Avatar />
      <Float placement="top-right" offset="0">
        <Icon name="ri:vip-crown-2-fill" class="text-yellow-10 rotate-40" aria-label="VIP" />
      </Float>
    </div>

    <div class="flex relative">
      <Avatar src="https://github.com/moujinet.png" />
      <Float placement="top-right" offset="-2px">
        <Icon
          name="ri:ghost-3-fill"
          class="text-accent animate-bounce"
          aria-label="Ghost behind the avatar"
        />
      </Float>
    </div>
  </div>
</template>
