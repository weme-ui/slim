<script lang="ts" setup>
</script>

<template>
  <div>
    <AvatarGroup
      size="md"
      color="accent"
      :max="3"
      :items="[
        { src: 'https://github.com/badbbad.png', fallback: 'A' },
        { src: 'https://github.com/badbbad.png', fallback: 'B' },
        { src: 'https://github.com/badbbad.png', fallback: 'C' },
        { src: 'https://github.com/moujinet.png', fallback: 'D' },
      ]"
    />
  </div>
</template>
